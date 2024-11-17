import { currentUser } from '@clerk/nextjs/server';

import { database } from '@repo/database';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@repo/design-system/components/ui/breadcrumb';
import { Separator } from '@repo/design-system/components/ui/separator';
import { SidebarTrigger } from '@repo/design-system/components/ui/sidebar';
import type { Metadata } from 'next';

const title = 'Acme Inc';
const description = 'My application.';

export const metadata: Metadata = {
  title,
  description,
};

const App = async () => {
  const user = await currentUser();
  if (!user) {
    return null;
  }

  const owners = await database.query.owner.findMany({
    where: (fields, { eq }) => eq(fields.userId, user.id),
  });

  const propertyOwnerships = await Promise.all(
    owners.map(async (owner) => {
      return await database.query.propertyOwnership.findMany({
        where: (fields, { eq }) => eq(fields.ownerId, owner.id),
        with: {
          property: true,
          premises: true,
        },
      });
    })
  );
  const ownedBuildings = propertyOwnerships
    .flat()
    .map((ownership) => ownership.property)
    .filter(Boolean);

  const ownedApartments = propertyOwnerships
    .flat()
    .filter((ownership) => ownership.premises)
    .map((ownership) => ({
      ...ownership.premises,
      property: ownership.property,
    }));
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Building Your Application
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <h2 className="text-2xl font-bold">My Buildings</h2>
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          {ownedBuildings.map((building) => (
            <div
              key={building.id}
              className="aspect-video rounded-xl bg-muted/50 p-4"
            >
              <h3 className="font-bold">{building.name}</h3>
              <p>{building.address}</p>
              <p>{building.area} m²</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold mt-8">My Apartments</h2>
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          {ownedApartments.map((apartment) => (
            <div
              key={apartment.id}
              className="aspect-video rounded-xl bg-muted/50 p-4"
            >
              <h3 className="font-bold">{apartment?.name}</h3>
              <p>Building: {apartment?.property?.name}</p>
              <p>{apartment.area} m²</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
