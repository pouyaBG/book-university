"use client";
import AuthForm from "@/components/AuthForm";
import { singUp } from "@/lib/actions/auth";
import { singUpSchema } from "@/lib/validations";
import React from "react";

const page = () => {
  return (
    <div>
      <AuthForm
        type="SING_UP"
        schema={singUpSchema}
        defaultValues={{
          email: "",
          password: "",
          fullName: "",
          universityId: 0,
          universityCard: "string",
        }}
        onSubmit={singUp}
      />
    </div>
  );
};

export default page;
