import { ref,computed } from "vue";
import { useFirebaseStorage } from "vuefire";
import { ref as storageRef, uploadBytesResumable,getDownloadURL } from "firebase/storage";
import { uid } from "uid";

export default function useImage() {
  const url = ref(null);
  const storage = useFirebaseStorage();
/**
 * Handles the file change event.
 *
 * @param {Event} e - The file change event.
 */
const onFileChange = (e) => {
  const file = e.target.files[0]; // Get the selected file
  const fileName = uid() + ".jpg"; // Generate a unique name for the file
  const storagePath = `/products/${fileName}`; // Specify the storage path for the file

  // Upload the file to the specified storage path
  const uploadTask = uploadBytesResumable(storageRef(storage, storagePath), file);

  uploadTask.on(
    "state_changed",
    () => {},
    (error) => console.log(error),
    () => {
      // The image has been uploaded
      getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
        url.value = downloadUrl;
      })
    }
  );
};

const isImageUploaded = computed(() => {
  return url.value ? url.value : null
})

  return {
    onFileChange,
    url,
    isImageUploaded
  };
}
