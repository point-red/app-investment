<template>
  <div>
    <div :class="textError.length ? 'input_group' : null">
      <label
        class="cursor-pointer w-full"
        :class="{ errors: textError.length }"
        :for="uploadFieldName"
      >
        <img
          v-if="file.preview"
          :src="file.preview"
          :alt="file.preview"
          :class="{ loading: loading == true }"
          class="rounded-lg shadow-lg overflow-hidden mx-auto"
        />
        <div
          v-else
          class="flex flex-col justify-center items-center h-48 bg-gray-100 rounded-lg"
        >
          <div class="font-bold text-gray-600 mb-2">Pilih gambar</div>
          <small class="text-gray-400">
            Max size {{ maxFileSize }}MB JGEG or PNG
          </small>
        </div>
        <input
          :name="uploadFieldName"
          @change="onSelectFile"
          type="file"
          class="hidden"
          :id="uploadFieldName"
          accept="image/*"
        />
      </label>
    </div>
    <div v-if="textError.length" class="invalid-feedback">
      {{ textError }}
    </div>
    <div v-if="textInfo" class="color-text size-12">
      {{ textInfo }}
    </div>
  </div>
</template>

<script lang="ts">
import { ref, watch } from "vue";

interface FileImage {
  name: string;
  file: File;
  preview: string;
}

export default {
  components: {},
  props: {
    uploadFieldName: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: false,
      default: "",
    },
    autoUpload: {
      type: Boolean,
      default: true,
      required: false,
    },
    maxFileSize: {
      type: Number,
      default: 5, //MB
      required: false,
    },
    maxWidth: {
      type: Number,
      default: 720, //MB
      required: false,
    },
    maxHeight: {
      type: Number,
      default: 430, //MB
      required: false,
    },
    quality: {
      type: Number,
      default: 0.5, //MB
      required: false,
    },
    loading: {
      type: Boolean,
      default: false,
      required: false,
    },
    textError: {
      type: String,
      default: "",
      required: false,
    },
    textInfo: {
      type: String,
      default: "",
      required: false,
    },
  },
  setup(props, { emit, root }) {
    const file = ref<FileImage>({
      name: "",
      file: null,
      preview: props.value ? props.value : "",
    });
    watch(
      () => props.value,
      () => {
        if (props.value == "") {
          file.value.preview = "";
          emit("input", "");
        } else {
          file.value.preview = props.value;
        }
      }
    );
    const onSelectFile = async (e) => {
      const MAX_FILE_SIZE = props.maxFileSize * 1024;
      const allowedExt = ["jpg", "jpeg", "png"];
      const dataFile = e.target.files[0];
      const fileName = dataFile.name.split(".");
      const ext = fileName[fileName.length - 1].toLowerCase();
      // validation
      if (!allowedExt.includes(ext))
        // return root.$toast.error("Hanya bisa jpg/jpeg/png");
        return console.log("Hanya bisa jpg/jpeg/png");
      if (Math.round(dataFile.size / 1024) >= MAX_FILE_SIZE)
        // return root.$toast.error(`Maksimal file ${props.maxFileSize}MB`);
        return console.log(`Maksimal file ${props.maxFileSize}MB`);
      file.value.name = dataFile.name;
      window.URL = window.URL || window.webkitURL;
      file.value.preview = window.URL.createObjectURL(dataFile);
      //compress image
      const image = new Image();
      image.src = file.value.preview;
      image.onload = function () {
        // have to wait till it's loaded
        const resized = resizeMe(image);
        const blobfile = b64toBlob(
          resized.split(",")[1],
          resized.split(",")[0]
        );
        blobfile.lastModifiedDate = new Date();
        blobfile.name = file.value.name;
        const outputFile = new File([blobfile], file.value.name, {
          type: blobfile.type,
        });
        file.value.file = outputFile;
        file.value.preview = window.URL.createObjectURL(outputFile);
        // on finish compress then
        if (props.autoUpload) {
          emit("input", file.value.preview);
          emit("onUpload", file.value);
        }
      };
    };
    function resizeMe(img: any) {
      const canvas = document.createElement("canvas");
      let width = img.width;
      let height = img.height;
      // calculate the width and height, constraining the proportions
      if (width > height) {
        if (width > props.maxWidth) {
          //height *= props.maxWidth / width;
          height = Math.round((height *= props.maxWidth / width));
          width = props.maxWidth;
        }
      } else {
        if (height > props.maxHeight) {
          //width *= props.maxHeight / height;
          width = Math.round((width *= props.maxHeight / height));
          height = props.maxHeight;
        }
      }
      // resize the canvas and draw the image data into it
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0, width, height);
      // preview.appendChild(canvas); // do the actual resized preview
      return canvas.toDataURL("image/jpeg", props.quality); // get the data from canvas as 70% JPG (can be also PNG, etc.)
    }
    const b64toBlob = (b64Data: string, contentType = "", sliceSize = 512) => {
      const byteCharacters = atob(b64Data);
      const byteArrays = [];
      for (
        let offset = 0;
        offset < byteCharacters.length;
        offset += sliceSize
      ) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }
      const blob = new Blob(byteArrays, { type: contentType });
      return blob;
    };
    return { file, onSelectFile };
  },
};
</script>
