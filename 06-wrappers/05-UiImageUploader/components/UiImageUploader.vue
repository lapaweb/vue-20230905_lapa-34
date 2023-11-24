<template>
  <div class="image-uploader">
    <label 
      class="image-uploader__preview"  
      :class="{'image-uploader__preview-loading': state==='load'}" 
      :style="previewNew" 
      @click.stop.prevent=deleteImage()
      >
       <span class="image-uploader__text">{{ inputText }}</span>
        <input 
         ref="fileInput"
         type="file"
         v-bind="$attrs"
         accept="image/*" 
         class="image-uploader__input"
         @change=attachImage($event)  
         />
      </label>
   </div>
</template>

<script>

export default {
  name: 'UiImageUploader',

  inheritAttrs: false,

  emits: ['remove', 'select', 'error', 'upload'],

  props: {
    preview: String,
    uploader: Function,
  },

  data() {
    return {
      previewNew: '',
      value: '',
      state: 'empty',
    }
  },

  computed: {
    inputText() {
      if (this.state == 'delete') {
        return 'Загрузить изображение'
      }
      if (this.preview || this.state == 'full') {
        return 'Удалить изображение'
      }
      if (this.state == 'load') {
        return 'Загрузка...'
      }
      return 'Загрузить изображение';
    },
  },
  
  created() {
    this.getDefoultPreview();
  },
  
  methods: {
    downloadUploadFile() {
      this.state = 'load'
    },
    getDefoultPreview() {
      this.previewNew = this.preview ? `--bg-url: url('${this.preview}')` : "--bg-url: var(--default-cover)"
    },
    handleUploaderSucces(result) {
      this.$emit('upload', result);
      this.previewNew = `--bg-url: url('${result.image}')`
      this.state = 'full';
    },
    handleUploaderError(error) {
      this.$emit('error', error);
      this.$refs['fileInput'].value = null;
      this.state = 'empty';
    },
    attachImage($event) {
      const files = $event.target.files;
      if (files.length) {
          this.$emit('select', files[0]);    
          if (this.uploader) {
              this.downloadUploadFile();
              this.uploader(files[0])
                .then((result) => this.handleUploaderSucces(result))
                .catch((error) => this.handleUploaderError(error))
            }
          else if(this.uploader == null) {
              this.previewNew = `--bg-url: url('${window.URL.createObjectURL(files[0])}')`;
              this.state = 'full';
            }
        }
      },
      deleteImage() {
        if (this.$refs['fileInput'].value === null) {
          return;
        }
        if (this.state == 'load') {
          return;
        }
        this.previewNew =  "--bg-url: var(--default-cover)";
        this.$refs['fileInput'].value = null;
        this.$emit('remove');
        this.state = 'delete';
    },
   }

  
};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  /* --bg-url: var(--default-cover); */
  /* --bg-url: v-bind(imageUrl); */
  /* --bg-url: "https://course-vue.javascript.ru/api/images/1" */
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
