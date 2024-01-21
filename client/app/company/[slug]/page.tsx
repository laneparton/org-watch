import PocketBase from 'pocketbase';

async function fetchHackerNews(query) {
  // restrictSearchableAttributes=url
  const res = await fetch(`http://hn.algolia.com/api/v1/search_by_date?query=${query}&tags=(story,ask_hn)&points>200`)
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

export default async function CompanyDetails({ params }: { params: { slug: string } }) {
    const pb = new PocketBase('http://127.0.0.1:8090');
    const company = await pb.collection('companies').getFirstListItem(`slug="${params.slug}"`);
    const hackerNewsResults = await fetchHackerNews(company.name);

    return (
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 grid gap-8">
          <section className="p-6 rounded-lg shadow-lg border">
            <h2 className="text-xl font-bold mb-4">{company.name}</h2>
            <div className="grid gap-2">
              <div>
                <p>{company.ticker}</p>
                <a className="text-blue-600 hover:underline" href="#">
                  {company.website}
                </a>
              </div>
              <div className="flex items-center gap-2">
                {/* <DollarSignIcon className="h-5 w-5 text-gray-500" /> */}
                <span>Market Cap: ${company.marketCap}</span>
              </div>
              <div className="flex items-center gap-2">
                {/* <UsersIcon className="h-5 w-5 text-gray-500" /> */}
                <span>Employees: {company.fullTimeEmployees}</span>
              </div>
              <p className="mt-4">
                {company.description}
              </p>
            </div>
          </section>
          <section className="p-6 rounded-lg shadow-lg border">
            <h2 className="text-xl font-bold mb-4">Recent Mentions</h2>
            <div className="grid gap-4">
              {hackerNewsResults?.hits?.map(result => (
                <div key={result.story_id}>
                  <h3 className="text-lg font-semibold">{result.title}</h3>
                  {/* <p className="text-gray-500">
                    
                  </p> */}
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    )
  }