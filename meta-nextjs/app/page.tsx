import { Myself } from '@/types';

import HTMLContent from '@/components/HTMLContent';

import { Employers } from '@/types';

async function getEmployers(): Promise<Employers> {
  const response = await fetch('http://localhost:3001/api/rest/v1/employers')
 
  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }
 
	const data = await response.json();	
  return data;
}

async function getMyself(): Promise<Myself> {
  const response = await fetch('http://localhost:3001/api/rest/v1/myself')
 
  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }
 
	const data = await response.json();
  return data;
}

export default async function Home() {
	const myself = await getMyself();
	const employers = await getEmployers();
  return (
		<>
	    <div>Home Page</div>
			<HTMLContent html={myself?.pageContent || ''} />
			<div>{JSON.stringify(employers)}</div>
		</>
  )
}
