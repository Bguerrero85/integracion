import { useEffect } from "react"
import {useForm} from "react-hook-form"
import { createTask, deleteTask, updateTask, getTask} from "../api/tasks.api"
import {useNavigate, useParams} from "react-router-dom"
import { toast } from "react-hot-toast"


export function TasksFormPage() {

    const {register, handleSubmit,formState: 
        { errors },
    setValue
    } = useForm()

    const navigate = useNavigate()
    const params = useParams()
    
    const onSubmit = handleSubmit(async data => {
        if (params.id) {
         await  updateTask(params.id, data)
         toast.success("Tarea actualizada", {
            position: "bottom-right",
            style:{
                backgroundColor:"black",
                color:'white'
            }
        })
        }
         else {
            await createTask(data);
            toast.success("Tarea creada", {
            position: "bottom-right",
            style:{
                backgroundColor:"black",
                color:'white'
            }
        })
         }
         navigate("/tasks");
                
    });

    useEffect(() => {
       async function loadTask(){
        if (params.id) {
         const res =  await getTask(params.id);
         console.log(res)
         setValue("titulo", res.data.titulo),
         setValue("descripcion", res.data.descripcion)
       }
       }
       loadTask()
    }, [])
    



    return (
        <div className="max-w-xl mx-auto">

            <form onSubmit={onSubmit}>
            <input type="text" 
            placeholder="titulo" 
            {...register("titulo", {required: true})}
            className="bg-zinc-700 p-3 rounded-lg block w-full mb-3 "
            />
            {errors.titulo && <span>Este campo es obligatorio</span>}
            <textarea rows="3" 
            placeholder="Descripcion"
            {...register("descripcion", {required: true})}
            className="bg-zinc-700 p-3 rounded-lg block w-full mb-3 "
            ></textarea>
            {errors.descripcion && <span>Este campo es obligatorio</span>}
            <button className="bg-indigo-500 p-3 rounded-lg block w-full mt-3"> Guardar </button>
            </form>

            {params.id && (
            <button
            className=" bg-red-500 p-3 rounded-lg w-48 mt-3"
             onClick={async() => {
                const accepted =  window.confirm("Estas seguro?");
              if (accepted) {
                await deleteTask(params.id);
                toast.success("Tarea eliminada", {
                    position: "bottom-right",
                    style:{
                        backgroundColor:"black",
                        color:'white'
                    }
                })
                 navigate("/tasks");
              }
            }}>Eliminar</button>)}

        </div>
        );
}