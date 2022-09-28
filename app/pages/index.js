import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { client, getPublications } from '../api';

export default function Home() {
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    fetchPublications();
  }, [])

  async function fetchPublications() {
    const result = await client.query(getPublications).toPromise();
    console.log({result});
    setPublications(result.data.publications.items);
    console.log({publications});
  }

  return (
    <>
      <Navbar />
      <h1>Lens Post Manager POC</h1>
    </>
  )
}
