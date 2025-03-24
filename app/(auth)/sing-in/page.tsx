"use client";
import AuthForm from "@/components/AuthForm";
import { singInWithCredentials } from "@/lib/actions/auth";
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
        onSubmit={singInWithCredentials}
      />
    </div>
  );
};

export default page;
