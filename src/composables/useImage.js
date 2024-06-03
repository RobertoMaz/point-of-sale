import { useFirebaseStorage } from "vuefire"
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { ref, computed } from "vue"

export default function useImage() {

    const url = ref(null)
    const storage = useFirebaseStorage()

    const onFileChange = e => {
        const id = crypto.randomUUID()
        const file = e.target.files[0]
        const sRef = storageRef(storage, `/products/${id}.jpg`)
        const uploadTask = uploadBytesResumable(sRef, file)

        uploadTask.on('state_changed',
            () => {},
            (error) => {console.log(error)},
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((urlDownload) => {
                        url.value = urlDownload
                    })
            }
        )

    }

    const isImageUploaded = computed(() => {
        return url.value ? url.value : null
    })

    return {
        url,
        isImageUploaded,
        onFileChange

    }
}