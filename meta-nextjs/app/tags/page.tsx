import { Tags } from '@/types';

async function getTags(): Promise<Tags> {
	const response = await fetch('http://localhost:3001/api/rest/v1/tags')
 
  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }
 
	const data = await response.json();	
  return data;
}

export default async function Tags() {

	const tags = await getTags();

  return (
		<>
	    <div>List of tags</div>
			<div>{JSON.stringify(tags)}</div>
		</>
  )
}
