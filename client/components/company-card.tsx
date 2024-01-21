import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import Link from "next/link"

export function CompanyCard({ name, slug, website, description, marketCap, fullTimeEmployees}) {
  return (
    <Card>
      <CardHeader className="flex flex-row">
        <img
          alt="Company Logo"
          className="aspect-[1/1] overflow-hidden rounded-lg object-contain object-center"
          height="50"
          src="https://placehold.co/50"
          width="50"
        />
        <div className="grid gap-1.5 ml-4">
          <CardTitle>
            <Link href={`/company/${slug}`}>{ name }</Link>
          </CardTitle>
          <CardDescription>
            <Link className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600" href={website}>
              Website
            </Link>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm/relaxed">
          {description.substring(0, 200) + '...'}
        </p>
        <div className="flex mt-4 justify-between	">
          <p className="text-sm/relaxed">
            <strong>Market Cap: </strong>
            {marketCap.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </p>
          <p className="text-sm/relaxed">
            <strong>Employees: </strong>
            {fullTimeEmployees.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
