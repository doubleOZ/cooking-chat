"use client";

import { useState, useEffect, useCallback } from "react";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import Input from "@/components/ui/Input";
import axios from "axios";

type Variant = "LOGIN" | "REGISTER";

export default function AuthForm() {
  const session = useSession();
  const [authChoice, setAuthChoice] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/dashboard");
    }
  }, [session?.status, router]);

  const toggleAuth = useCallback(() => {
    if (authChoice === "LOGIN") {
      setAuthChoice("REGISTER");
    } else {
      setAuthChoice("LOGIN");
    }
  }, [authChoice]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (authChoice === "REGISTER") {
      axios
        .post("/api/register", data) // /api/register/routes.ts
        .then(() => signIn("credentials", data))
        .catch(() => toast.error("Something went wrong!"))
        .finally(() => setIsLoading(false));
    }
    if (authChoice === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials");
          }
          if (callback?.ok && !callback?.error) {
            toast.success("Log in successful!");
            router.push("/dashboard");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            className="mx-auto h-10 w-auto bg-opacity-0"
            alt="Logo"
            src="/images/cook-chat.png"
            height="48"
            width="48"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-slate-700">
            Sign in to get cooking!
          </h2>
        </div>

        <div className="mt-10 sm:rounded-lg  sm:mx-auto sm:w-full sm:max-w-sm px-4 py-4 shadow  bg-orange-200">
          {/* we wrap our onSubmit inside handleSubmit from react-hook-forms so that handleSubmit can pass onSubmit the correct date */}
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {authChoice === "REGISTER" && (
              <Input
                id="name"
                label="Name"
                register={register}
                errors={errors}
                disabled={isLoading}
              />
            )}
            <Input
              id="email"
              label="Email Address"
              type="email"
              register={register}
              errors={errors}
              disabled={isLoading}
            />
            <Input
              id="password"
              label="Password"
              type="password"
              register={register}
              errors={errors}
              disabled={isLoading}
            />

            <div>
              <Button
                variant="brand"
                disabled={isLoading}
                type="submit"
                className="flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm"
              >
                {authChoice === "LOGIN" ? "Sign in" : "Register"}
              </Button>
            </div>
          </form>
          <div className="mt-6">
            <div className="relative">
              <div
                className="
                absolute 
                inset-0 
                flex 
                items-center
              "
              >
                <div className="w-full border-t border-slate-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-orange-200 px-2 text-slate-600">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <Button
                isLoading={isLoading}
                variant="default"
                onClick={() =>
                  signIn("github").then((callback) => {
                    if (callback?.error) {
                      toast.error("Invalid Credentials");
                    }
                    if (callback?.ok && !callback?.error) {
                      toast.success("Logged in!");
                    }
                  })
                }
                className="mt-5  mx-auto w-full "
              >
                <svg
                  fill="white"
                  className="mr-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 48 48"
                >
                  <path d="M 24 4 C 12.972066 4 4 12.972074 4 24 C 4 35.027926 12.972066 44 24 44 C 35.027934 44 44 35.027926 44 24 C 44 12.972074 35.027934 4 24 4 z M 24 7 C 33.406615 7 41 14.593391 41 24 C 41 31.66536 35.956939 38.122519 29 40.251953 L 29 35.136719 C 29 33.226635 27.899316 31.588619 26.308594 30.773438 A 10 8 0 0 0 32.4375 18.720703 C 32.881044 17.355414 33.376523 14.960672 32.199219 13.076172 C 29.929345 13.076172 28.464667 14.632086 27.765625 15.599609 A 10 8 0 0 0 24 15 A 10 8 0 0 0 20.230469 15.59375 C 19.529731 14.625773 18.066226 13.076172 15.800781 13.076172 C 14.449711 15.238817 15.28492 17.564557 15.732422 18.513672 A 10 8 0 0 0 21.681641 30.779297 C 20.3755 31.452483 19.397283 32.674042 19.097656 34.15625 L 17.783203 34.15625 C 16.486203 34.15625 15.98225 33.629234 15.28125 32.740234 C 14.58925 31.851234 13.845172 31.253859 12.951172 31.005859 C 12.469172 30.954859 12.144453 31.321484 12.564453 31.646484 C 13.983453 32.612484 14.081391 34.193516 14.650391 35.228516 C 15.168391 36.160516 16.229687 37 17.429688 37 L 19 37 L 19 40.251953 C 12.043061 38.122519 7 31.66536 7 24 C 7 14.593391 14.593385 7 24 7 z"></path>
                </svg>
                Github
              </Button>

              <Button
                isLoading={isLoading}
                type="button"
                className="mt-5  mx-auto w-full"
                onClick={() =>
                  signIn("google").then((callback) => {
                    if (callback?.error) {
                      toast.error("Invalid Credentials");
                    }
                    if (callback?.ok && !callback?.error) {
                      toast.success("Logged in!");
                    }
                  })
                }
              >
                {isLoading ? null : (
                  <svg
                    className="mr-2 h-4 w-4"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="github"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                    <path d="M1 1h22v22H1z" fill="none" />
                  </svg>
                )}
                Google
              </Button>
            </div>
          </div>

          <div
            className="
            flex 
            gap-2 
            justify-center 
            text-sm 
            mt-6 
            px-2 
            text-gray-500
          "
          >
            <div onClick={toggleAuth} className="underline cursor-pointer">
              {authChoice === "LOGIN" ? "Create an account" : "Login"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
