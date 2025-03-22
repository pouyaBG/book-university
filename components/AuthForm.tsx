"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FIELD_NAMES, FIELD_TYPES } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { ZodType } from "zod";
import ImageUpload from "./ImageUpload";

interface Props<T extends FieldValues> {
  type: "SING_IN" | "SING_UP";
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
}

const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: Props<T>) => {
  const isSingIn = type === "SING_IN";
  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });
  const handleSubmit: SubmitHandler<T> = async (data) => {};

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-white">
        {isSingIn ? "welcome back to BookWise" : "Create your library account"}
      </h1>
      <p className="text-gray-100">
        {isSingIn
          ? "Access the vast collection of resources, and stay updated"
          : "Please complete all fields and upload a valid university ID to gain access to the library"}
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 w-full mt-5">
          {Object.keys(defaultValues).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize text-white mb-1">
                    {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                  </FormLabel>
                  <FormControl>
                    {field.name === "universityCard" ? (
                      <ImageUpload onFileChange={field.onChange} />
                    ) : (
                      <Input
                        required
                        type={
                          FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]
                        }
                        {...field}
                        className="w-full min-h-12 border-none text-base font-bold placeholder:font-normal text-white placeholder:text-light-100 focus-visible:ring-0 focus-visible:shadow-none bg-black"
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            className="bg-[#E7C9A5] text-black  hover:bg-primary hover:text-white cursor-pointer inline-flex min-h-14 w-full items-center justify-center rounded-md px-6 py-2 font-bold text-base"
            type="submit">
            {isSingIn ? "Sing In" : "Sing Up"}
          </Button>
        </form>
      </Form>
      <p className="text-center text-base font-medium text-gray-400">
        {isSingIn ? "New to BookWise? " : "Already have an account? "}
        <Link
          href={isSingIn ? "/sing-up" : "/sing-in"}
          className="text-[#E7C9A5] font-bold">
          {isSingIn ? "Create an account" : "Sing in"}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;
