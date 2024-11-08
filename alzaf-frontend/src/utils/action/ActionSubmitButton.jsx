"use client";
import Spinner from "@/components/shared/Spinner/Spinner";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export default function ActionSubmitButton({ children }) {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      type="submit"
      className="bg-orange-500 w-full hover:bg-orange-600"
    >
      {pending ? <Spinner></Spinner> : children}
    </Button>
  );
}
