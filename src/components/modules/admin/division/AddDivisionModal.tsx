import SingleImageUploader from "@/components/SingleImageUploader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { FileMetadata } from "@/hooks/use-file-upload";
import { useAddDivisionMutation } from "@/redux/features/division/division.api";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function AddDivisionModal() {
  const [image, setImage] = useState<(File | FileMetadata) | null>(null);

  const [addDivision] = useAddDivisionMutation();
  console.log("inside add divition:", image);
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const [open, setOpen] = useState(false);

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    formData.append("file", image as File);

    const toastId = toast.loading("Division Adding...");
    try {
      const res = await addDivision(formData).unwrap();
      if (res.success) {
        toast.success("Division Added", { id: toastId });
        setOpen(false);
      }
    } catch (error) {
      console.error(error);
    }
    // console.log(formData.get("file"));
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Division</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Division</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-4"
            id="add-division"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Division Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="e.g Rajshahi"
                      {...field}
                      value={field.value}
                    />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Division Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} value={field.value} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
          <SingleImageUploader onChange={setImage} />
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button disabled={!image} form="add-division" type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
