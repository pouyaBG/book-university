"use client";
import AuthForm from "@/components/AuthForm";
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
          universityCard: "",
        }}
        onSubmit={() => {}}
      />
    </div>
  );
};

export default page;
