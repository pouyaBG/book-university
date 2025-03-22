"use client";
import AuthForm from "@/components/AuthForm";
import { singInSchema } from "@/lib/validations";
import React from "react";

const page = () => {
  return (
    <div>
      <AuthForm
        type="SING_IN"
        schema={singInSchema}
        defaultValues={{
          email: "",
          password: "",
        }}
        onSubmit={() => {}}
      />
    </div>
  );
};

export default page;
