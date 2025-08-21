import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { AddTourTypeModal } from "@/components/modules/admin/tourtype/AddTourTypeModal";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useGetTourTypesQuery,
  useRemoveTourTypeMutation,
} from "@/redux/features/tour/tour.api";
import { TrashIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
export const addTourType = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(3);
  console.log(currentPage);

  const [removeTourType] = useRemoveTourTypeMutation();
  const { data } = useGetTourTypesQuery({ page: currentPage, limit });

  const handleRemoveTourType = async (Id: string) => {
    const toastId = toast.loading("Removing....");
    try {
      const res = await removeTourType(Id).unwrap();

      if (res.success) {
        toast.success("Tour Type removed successfully", { id: toastId });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const totalPage = data?.meta?.totalPage || 1;

  return (
    <div className="w-full max-w-7xl mx-auto px-5">
      <div className="flex justify-between my-8">
        <h1 className="text-xl font-semibold">Tour Types</h1>
        <AddTourTypeModal />
      </div>
      <div className="border border-muted rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.map((item: { _id: string; name: string }) => (
              <TableRow key={item.name}>
                <TableCell className="font-medium w-full">
                  {item.name}
                </TableCell>
                <TableCell className="font-medium">
                  {/* <Button size="sm">
                    <TrashIcon />
                  </Button> */}
                  <DeleteConfirmation
                    onConfirm={() => handleRemoveTourType(item._id)}
                  >
                    <Button size="sm">
                      <TrashIcon />
                    </Button>
                  </DeleteConfirmation>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {totalPage > 1 && (
        <div className="flex justify-end mt-4">
          <div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    className={
                      currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
                {Array.from({ length: totalPage }, (_, index) => index + 1).map(
                  (page) => (
                    <PaginationItem
                      onClick={() => setCurrentPage(page)}
                      key={page}
                    >
                      <PaginationLink isActive={currentPage === page}>
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    className={
                      currentPage === totalPage
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      )}
    </div>
  );
};
