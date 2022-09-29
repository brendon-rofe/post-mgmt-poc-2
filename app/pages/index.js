import { ethers, BigNumber } from 'ethers';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Button } from '@chakra-ui/react';
import { client, getPublications } from '../api';
import { testContractAddr, TEST_ABI } from './abi';

const provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/DfetfELTdOKv7rjaiM9uzRoZfeUSFQrC");
const testContract = new ethers.Contract(testContractAddr, TEST_ABI, provider);

const profileId = BigNumber.from(14419).toHexString();
console.log(profileId);

export default function Home() {
  const [publications, setPublications] = useState([]);
  const [pubIds, setPubids] = useState([]);

  useEffect(() => {
    // fetchPublications();
    // getUserPostIds();
  }, [])

  async function getUserPostIds() {
    let userPostIds = await testContract.getAllUserPostIds(profileId);
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

  return (
    <>
      <Navbar />
      <h1>Lens Post Manager POC</h1>
      <Button onClick={fetchPublications}>Get publications</Button>
      <Button onClick={getUserPostIds}>Get Ids</Button>
      {/* {
        publications.map((publication) => (
            <p>{publication.id}</p>
        ))
      } */}
    </>
  )
}