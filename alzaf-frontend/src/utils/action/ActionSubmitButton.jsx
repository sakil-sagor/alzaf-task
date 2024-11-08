"use client";
import Spinner from "@/components/shared/Spinner/Spinner";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export default function ActionSubmitButton({ children }) {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit">
      {pending ? <Spinner></Spinner> : children}
    </Button>
  );
}
