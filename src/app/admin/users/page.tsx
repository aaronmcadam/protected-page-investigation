import { DataTable } from "@/components/data-table"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

// Hard-coded user data
const data = [
  {
    id: 1,
    fullName: "Sarah Chen",
    email: "sarah.chen@gmail.com",
    status: "Active",
    creationDate: "15 Mar 2024"
  },
  {
    id: 2,
    fullName: "Marco Rossi",
    email: "marco@bellavistapizza.it",
    status: "Unverified",
    creationDate: "22 Feb 2024"
  },
  {
    id: 3,
    fullName: "Emma Thompson",
    email: "emma.thompson@outlook.com",
    status: "Suspended",
    creationDate: "08 Jan 2024"
  },
  {
    id: 4,
    fullName: "Hiroshi Tanaka",
    email: "h.tanaka@tokyoramen.jp",
    status: "Pending",
    creationDate: "30 Dec 2023"
  },
  {
    id: 5,
    fullName: "Sophie Martin",
    email: "sophie.martin@yahoo.fr",
    status: "Active",
    creationDate: "18 Nov 2023"
  },
  {
    id: 6,
    fullName: "James Wilson",
    email: "james@greengardenmarket.com",
    status: "Active",
    creationDate: "05 Oct 2023"
  },
  {
    id: 7,
    fullName: "Priya Patel",
    email: "priya.patel@hotmail.com",
    status: "Declined",
    creationDate: "12 Sep 2023"
  },
  {
    id: 8,
    fullName: "Lucas Silva",
    email: "lucas@artisanbakery.com.au",
    status: "Declined",
    creationDate: "28 Aug 2023"
  },
  {
    id: 9,
    fullName: "Anna Kowalski",
    email: "anna.kowalski@gmail.com",
    status: "Pending",
    creationDate: "14 Jul 2023"
  },
  {
    id: 10,
    fullName: "David Kim",
    email: "david@spiceroute.co.uk",
    status: "Suspended",
    creationDate: "03 Jun 2023"
  }
]

export default function UsersPage() {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 px-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Users</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4">
        <DataTable data={data} />
      </div>
    </>
  )
}