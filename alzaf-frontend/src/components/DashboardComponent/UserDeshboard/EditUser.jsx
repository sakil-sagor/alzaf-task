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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { toast } from "sonner";
const EditUser = ({ data, setReload }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDisbaled, setIsdisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const { name, role, email, _id } = data;
  const [file, setFile] = useState("");
  const [updateFullName, setUpdateFullName] = useState(name);

  const [userRole, setUserRole] = useState(role);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updatedData = {
        _id: _id,
        name: updateFullName,
        role: userRole,
      };

      const response = await fetch(
        `https://alzaf-server.vercel.app/api/v1/users/${_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        toast.success("Success");
        setIsdisabled(true);
        setLoading(false);
        setReload((prev) => prev + 1);
        setIsOpen(false);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "An unexpected error occurred");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message || "An unexpected error occurred");
      console.error("Error:", error);
    }
  };

  return (
    <AlertDialog open={isOpen} onClose={() => setIsOpen(false)}>
      <AlertDialogTrigger className="">
        <div onClick={() => setIsOpen(true)} className="py-1 text-blue-950">
          <CiEdit className="m-1 inline text-3xl font-bold"></CiEdit>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-3xl">
        <AlertDialogTitle></AlertDialogTitle>

        <AlertDialogDescription className=" "></AlertDialogDescription>
        <form
          onSubmit={handleSubmit}
          className="mx-auto w-full space-y-10 p-5 py-4"
        >
          <div className="mb-4">
            <Label className="mb-2 block">Full Name</Label>
            <Input
              value={updateFullName}
              onChange={(e) => {
                setUpdateFullName(e.target.value);
                setIsdisabled(false);
              }}
              type="text"
              name="title"
              required
            />
          </div>
          <div className="mb-4">
            <Label className="mb-2 block">Email</Label>
            <Input value={email} type="text" />
          </div>

          <div className="mb-4">
            <Select
              value={userRole}
              onValueChange={(value) => {
                setUserRole(value);
                setIsdisabled(false);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="user">User</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className=" ">
            <div
              className={`flex h-10 items-center justify-center rounded font-semibold text-white  ${
                isDisbaled
                  ? "bg-[#91AADF]"
                  : "bg-orange-500 hover:bg-orange-600"
              }`}
            >
              <button
                disabled={isDisbaled}
                type="submit"
                className={`py-18 h-full w-full ${loading && "hidden"}`}
              >
                <span>Submit</span>
              </button>
            </div>
          </div>
        </form>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsOpen(false)}>
            Close
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EditUser;
