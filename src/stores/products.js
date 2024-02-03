import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { useFirestore, useCollection, useFirebaseStorage } from "vuefire";
import {
  collection,
  addDoc,
  where,
  query,
  limit,
  orderBy,
  updateDoc,
  doc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { ref as storageRef, deleteObject } from "firebase/storage";

// Define a store for managing products
export const useProductsStore = defineStore("products", () => {
  const db = useFirestore();
  const storage = useFirebaseStorage();

  const selectedCategory = ref(1);
  const categories = [
    { id: 1, name: "Sudaderas" },
    { id: 2, name: "Zapatillas" },
    { id: 3, name: "Gafas de sol" },
  ];

  const q = query(collection(db, "products"));
  const productsCollection = useCollection(q);

  /**
   * Creates a new product in the database.
   * @param {Object} product - The product object to be added.
   * @returns {Promise<void>} - A promise that resolves when the product is successfully created.
   */
  async function createProduct(product) {
    // Add the product to the 'products' collection in the database
    await addDoc(collection(db, "products"), product);
  }

  /**
   * Updates an existing product in the database.
   * @param {DocumentReference} docRef - The document reference of the product to be updated.
   * @param {Object} product - The updated product object.
   * @returns {Promise<void>} - A promise that resolves when the product is successfully updated.
   */
  async function updateProduct(docRef, product) {
    const { image, url, ...values } = product;
    if (image.length) {
      await updateDoc(docRef, {
        ...values,
        image: url.value,
      });
    } else {
      await updateDoc(docRef, values);
    }
  }

  /**
   * Deletes a product from the database.
   * @param {string} id - The ID of the product to be deleted.
   * @returns {Promise<void>} - A promise that resolves when the product is successfully deleted.
   */
  async function deleteProduct(id) {
    if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);
      const { image } = docSnap.data();
      const imageRef = storageRef(storage, image);

      await Promise.all([deleteDoc(docRef), deleteObject(imageRef)]);
    }
  }

  // Compute the category options for the product form
  const categoryOptions = computed(() => {
    const options = [
      {
        label: "Seleccionar categoria",
        value: "",
        attrs: { disabled: true },
      },
      ...categories.map((category) => ({
        label: category.name,
        value: category.id,
      })),
    ];
    return options;
  });

  // Compute whether there are no results in the products collection
  const noResults = computed(() => productsCollection.value.length === 0);

  const filteredProducts = computed(() => {
    return productsCollection.value
      .filter((product) => product.category === selectedCategory.value)
      .filter(product => product.availability > 0) ;
  });

  return {
    createProduct,
    updateProduct,
    deleteProduct,
    categories,
    selectedCategory,
    categoryOptions,
    productsCollection,
    noResults,
    filteredProducts,
  };
});
