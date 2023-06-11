import { Projects } from '@/types';

async function getProjects(): Promise<Projects> {
	console.log('About to fetch');
  const response = await fetch('http://localhost:3001/api/rest/v1/projects')
 
  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }
 
	const data = await response.json();	
  return data;
}


export default async function Projects() {

	const projects = await getProjects();

  return (
		<>
	    <div>List of projects</div>
			<div>{JSON.stringify(projects)}</div>
		</>
  )
}
