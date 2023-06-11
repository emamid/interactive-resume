import HTMLContent from '@/components/HTMLContent';

async function getData() {
	console.log('About to fetch');
  const response = await fetch('http://localhost:3001/api/rest/v1/myself')
 
  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }
 
	const data = await response.json();
  return data;
}

export default async function Home() {
	const myself = await getData();
  return (
		<>
	    <div>Home Page</div>
			<HTMLContent html={myself?.pageContent || ''} />
		</>
  )
}
