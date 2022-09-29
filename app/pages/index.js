import { ethers, BigNumber } from 'ethers';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Button } from '@chakra-ui/react';
import { client, getPublications } from '../api';
import { testContractAddr, lensHubAddress, TEST_ABI, LENS_HUB_ABI } from './abi';

const privateKey = "9aece0fa1f7d7a9ca19468f70da30d8c8b804e305574cfb8be00210e3ff7bb4d";

const provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/DfetfELTdOKv7rjaiM9uzRoZfeUSFQrC");
const wallet = new ethers.Wallet(privateKey, provider);
const testContract = new ethers.Contract(testContractAddr, TEST_ABI, provider);
const lensHubContract = new ethers.Contract(lensHubAddress, LENS_HUB_ABI, provider);

const profileId = 14419;
const contentURI = "https://ipfs.io/ipfs/Qmby8QocUU2sPZL46rZeMctAuF5nrCc7eR1PPkooCztWPz";
const collectModule = "0x0BE6bD7092ee83D44a6eC1D949626FeE48caB30c";
const collectModuleInitData = "0x0000000000000000000000000000000000000000000000000000000000000001";
const referenceModule = "0x0000000000000000000000000000000000000000";
const referenceModuleInitData = "0x00";

const profileIdHex = BigNumber.from(14419).toHexString();
console.log(profileIdHex);

export default function Home() {
  const [publications, setPublications] = useState([]);
  const [pubIds, setPubids] = useState([]);

  useEffect(() => {
    fetchPublications();
    getUserPostIds();
  }, [])

  async function getUserPostIds() {
    let userPostIds = await testContract.getAllUserPostIds(profileIdHex);
    console.log(userPostIds);
    setPubids(userPostIds);
    console.log(pubIds);
  }

  async function fetchPublications() {
    const result = await client.query(getPublications, { ids: pubIds }).toPromise();
    console.log({result});
    setPublications(result.data.publications.items);
    console.log({publications});
  }

  async function createPost() {
    const lensHubContractWithSigner = lensHubContract.connect(wallet);
  
    const tx1 = await lensHubContractWithSigner.post([
      profileId,
      contentURI,
      collectModule,
      collectModuleInitData,
      referenceModule,
      referenceModuleInitData
    ]);

    let pubNum = await lensHubContract.getPubCount(profileId);
    pubNum++;
    console.log(pubNum);
    let pubIdToPost = BigNumber.from(pubNum).toHexString();
    console.log(pubIdToPost);

    const testContractWithSigner = testContract.connect(wallet);
  
    const tx2 = await testContractWithSigner.addUserPostId(profileIdHex, `${profileIdHex}-${pubIdToPost}`);

    await tx1.wait();
    await tx2.wait();

    console.log(`${profileIdHex}-${pubIdToPost}`);
  
    console.log(tx1);
    console.log(tx2);
  }

  return (
    <>
      <Navbar />
      <h1>Lens Post Manager POC</h1>
      <Button onClick={fetchPublications}>Get Publications</Button>
      <Button onClick={getUserPostIds}>Get Ids</Button>
      <Button onClick={createPost} >Create Post</Button>
      {
        publications.map((publication) => (
            <p>{publication.id}</p>
        ))
      }
    </>
  )
}