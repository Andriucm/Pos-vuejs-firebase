<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import Link from '@/components/Link.vue';
import useImage from '../../composables/useImage';
import { useProductsStore } from "@/stores/products";


const { onFileChange, url, isImageUploaded } = useImage();
const products = useProductsStore();

const router = useRouter();

const formData = reactive({
    name: 'Sudadera',
    category: '',
    price: '',
    availability: '',
    image: '',
})
const submitHandler = async data => {
    const { image, ...values } = data

    try {
        await products.createProduct({
            ...values,
            image: url.value
        })
        router.push({ name: 'products' })

    } catch (error) {
        console.log(error);

    }


}
</script>
 
<template>
    <div>
        <Link to="products">
        Volver
        </Link>
        <h1 class="text-4xl font-black my-10">Nuevo Producto</h1>

        <div class="flex justify-center bg-white shadow">
            <div class="mt-10 p-10 w-full 2xl:w-2/4">
                <FormKit @submit="submitHandler" :value="formData" type="form"
                    incomplete-message="Rellene el formulario para continuar" submit-label="Agregar Producto">
                    <FormKit v-model="formData.name" type="text" label="Nombre" name="name" placeholder="Nombre de Producto"
                        validation="required" :validation-messages="{ required: 'El nombre del producto es Obligatoria' }">
                    </FormKit>
                    <FormKit v-model="formData.image" @change="onFileChange" type="file" label="Imagen Producto"
                        name="image" validation="required"
                        :validation-messages="{ required: 'La imagen del producto es Obligatoria' }" accept=".jpg">
                    </FormKit>
                    <div v-if="isImageUploaded">
                        <p class="font-black">Imagen Producto:</p>
                        <img :src="isImageUploaded" alt="Nueva imagen producto" class="w-32">
                    </div>
                    <FormKit v-model.number="formData.category" type="select" label="Categoria" name="category"
                        validation="required"
                        :validation-messages="{ required: 'La categoria del producto es Obligatoria' }"
                        :options="products.categoryOptions">
                    </FormKit>
                    <FormKit v-model.number="formData.price" type="number" label="Precio" name="price"
                        placeholder="Precio del producto" validation="required"
                        :validation-messages="{ required: 'El precio del producto es Obligatoria' }" min="1"></FormKit>
                    <FormKit v-model.number="formData.availability" type="number" label="Disponible" name="availability"
                        placeholder="Cantidad disponible" validation="required"
                        :validation-messages="{ required: 'La cantidad del producto es Obligatoria' }" min="1"></FormKit>
                </FormKit>


            </div>
        </div>


    </div>
</template>
