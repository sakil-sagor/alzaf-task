"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "sonner";

const DeleteDataModal = ({ url, setReload }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleBlogDelete = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Loading...");
    try {
      const response = await axios.delete(
        url,
      );
      if (response.status === 200) {
        setIsOpen(false);
        toast.dismiss(toastId);
        toast.success("success");
        setReload((prev) => prev + 1);
      }
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error.message || "An unexpected error occurred");
      console.error("Error:", error);
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <AlertDialog open={isOpen} onClose={() => setIsOpen(false)}>
      <AlertDialogTrigger>
        <div onClick={() => setIsOpen(true)} className="py-1 text-blue-950">
          <MdDeleteOutline className="m-1 inline text-3xl text-red-800"></MdDeleteOutline>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-xl">
        <AlertDialogTitle></AlertDialogTitle>
        <AlertDialogDescription></AlertDialogDescription>
        <div className="customScrollbar max-h-[70vh] space-y-5 overflow-y-auto p-4 text-center text-gray-900">
          <h3 className="text-2xl font-bold">Are Your sure ?</h3>
          <h3 className="text-lg font-semibold">
            Once you delete You Can not get it back
          </h3>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <button
            onClick={handleBlogDelete}
            className="btn bg-red-800 p-2 px-5 text-white hover:bg-red-800"
          >
            Delete
          </button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDataModal;