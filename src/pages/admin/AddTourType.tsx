import { AddTourTypeModal } from "@/components/modules/admin/tourtype/AddTourTypeModal";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetTourTypesQuery } from "@/redux/features/tour/tour.api";
import { TrashIcon } from "lucide-react";
export const addTourType = () => {
  const { data } = useGetTourTypesQuery(undefined);

  return (
    <div className="w-full max-w-7xl mx-auto px-5">
      <div className="flex justify-between my-8">
        <h1 className="text-xl font-semibold">Tour Types</h1>
        <AddTourTypeModal />
      </div>
      <div className="border border-muted rounded-md">
        <Table>
          <TableCaption>A list of your recent Tour Type.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.map((item: { name: string }) => (
              <TableRow key={item.name}>
                <TableCell className="font-medium w-full">
                  {item.name}
                </TableCell>
                <TableCell className="font-medium">
                  <Button size="sm">
                    <TrashIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
