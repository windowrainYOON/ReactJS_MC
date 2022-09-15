import React, { useState } from "react";
import { useForm } from "react-hook-form";

// function ToDoList () {
//   const [toDo, setToDo] = useState("");
//   const [toDoError, setToDoError] = useState("");
//   const onChange = (event:React.FormEvent<HTMLInputElement>) => {
//     const {currentTarget: {value},
//     } = event;
//     setToDoError("");
//     setToDo(value);
//   };
//   const onSubmit = (event:React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     if(toDo.length < 10) {
//       return setToDoError("To do should be longer");
//     }
//     console.log("submit");
//   };
//   return(
//     <>
//       <form onSubmit={onSubmit}>
//         <input onChange={onChange} value={toDo} placeholder="Write a to do"/>
//         <button>Add</button>
//         {toDoError !== "" ? toDoError : null}
//       </form>
//     </>
//   )
// }

type IForm = {
  extraError: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  CheckingPassword?: string;
};

function HookForm (){
  const {register, handleSubmit, formState:{errors}, setError} = useForm<IForm>({defaultValues:{email:"@naver.com"}});
  const onValid = (data:IForm) => {
    if(data.password !== data.CheckingPassword){
      setError("password",{message:"Password are not the same"}, {shouldFocus:true})
    }
    setError("extraError", {message:"Server offline"})
  };
  return(
    <>
      <form onSubmit={handleSubmit(onValid)} style={{display:"flex", flexDirection:"column" }}>
        <input 
          {...register("email", {
            required: "Email required", 
            minLength:{value:5, message:"your email is too short"}, 
            pattern:{ value:/^[A-Za-z0-9._%+-]+@naver.com$/, message:"invalid form of email"}
          })} 
          placeholder="Email"
        />
        <span>{errors?.email?.message}</span>
        <input 
          {...register("firstName", {
            required: "write here accept nico", 
            validate: {
              noNico: (value) => value?.includes("nico") ? "no nicos allowed" : true,
              noNick: value => value?.includes("nick") ? "no nick allowed" : true,
            },
          })} 
          placeholder="First name"
        />
        <span>{errors?.firstName?.message}</span>
        <input 
          {...register("lastName", {
            required: "write here"
          })} 
          placeholder="Last name"
        />
        <span>{errors?.lastName?.message}</span>
        <input 
          {...register("password", {
            required: "write here"
          })} 
          placeholder="password"
        />
        <span>{errors?.password?.message}</span>
        <input 
          {...register("CheckingPassword", {
            required: "Password is required"
          })} 
          placeholder="CheckingPassword"
        />
        <span>{errors?.CheckingPassword?.message}</span>
        <button>Add</button>
        <span>{errors?.extraError?.message}</span>
      </form>
    </>
  )
}

export default HookForm;