import styles from './Card.module.scss'
import { useForm} from 'react-hook-form'
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'
// import { createUser } from '../../apis/users';


function Card(){
    const validationSchema = yup.object({
        question: yup.string().required('Renseigner votre question').min(3, 'Avec plus de 3 caractéres'),
        answer: yup.string().required('Renseigner votre reponse').min(3, 'Avec plus de 3 caractéres'),
        tag: yup.string(),
    })

    const initialValues = {
        question: '',
        answer :'',
        tag: '',
    }

    const { handleSubmit , register , formState: {errors, isSubmitting}, setError, clearErrors} = useForm({
        initialValues,
        resolver: yupResolver(validationSchema)
    });

    const submit = handleSubmit((credentials) => {
        try {
            clearErrors()
            // const card = createUser(credentials);
            
        } catch(message){
            setError("generic", {type: "generic", message})
        }
    })


    return   (
    <div className="flex-fill d-flex align-items-center justify-content-center">
    <form onSubmit={submit} className={`${styles.form} d-flex flex-column card p-20`}>
        <h2 className="mb-10"> Create card</h2>
        <div className="mb-10 d-flex flex-column">
            <label htmlFor='firstName'>Question</label>
        <input type="text" name="question" {...register('question')}/>
        {errors.question && <p className='form-error'>{errors.question.message}</p>}
        </div>
        <div className="mb-10 d-flex flex-column">
            <label htmlFor='lastName'>Answer</label>
        <input type="text" name="lastName" {...register('lastName')}/>
        {errors.answer && <p className='form-error'>{errors.answer.message}</p>}
        </div>
        <div className="mb-10 d-flex flex-column">
            <label htmlFor='tag'>Tag</label>
        <input type="text" name="tag" {...register('email')}/>
        {errors.tag && <p className='form-error'>{errors.tag.message}</p>}
        </div>
        {errors.generic&& <p className='form-error'>{errors.generic.message}</p>}
        <div>
        <button disabled={isSubmitting} className='btn btn-primary'>Créer</button>
        </div>
    </form>
    </div>
    )
}

export default Card