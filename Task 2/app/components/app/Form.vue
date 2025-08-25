<template>
  <div class="form-wrapper">
    <VForm @submit.prevent="submitForm" ref="refVForm">
      <VRow>
        <VCol cols="12" md="6" />

        <VCol cols="12" md="6" class="d-flex form-content">
          <VRow class="my-auto">
            <VCol cols="12" sm="6">
              <VLabel>
                {{ $t('form-data.fullname-en') }}
              </VLabel>
    
              <VTextField v-model="nameEn" variant="outlined"
                :rules="[requiredValidator, englishValidator(nameEn), lengthValidator(nameEn, 255)]" />
            </VCol>
            
            <VCol cols="12" sm="6">
              <VLabel>
                {{ $t('form-data.fullname-ar') }}
              </VLabel>
    
              <VTextField v-model="nameAr" variant="outlined"
                :rules="[requiredValidator, arabicValidator(nameAr), lengthValidator(nameAr, 255)]" />
            </VCol>
    
            <VCol cols="12" md="6">
              <VLabel>
                {{ $t('form-data.email') }}
              </VLabel>
    
              <VTextField v-model="email" variant="outlined"
                :rules="[requiredValidator, lengthValidator(email, 255), emailValidator]" />
            </VCol>
            
            <VCol cols="12" md="6">
              <VLabel>
                {{ $t('form-data.subject') }}
              </VLabel>
    
              <VTextField v-model="subject" variant="outlined"
                :rules="[requiredValidator, lengthValidator(subject, 255)]" />
            </VCol>
            
            <VCol cols="12" md="6">
              <VLabel>
                {{ $t('form-data.address-en') }}
              </VLabel>
    
              <VTextField v-model="addressEn" variant="outlined"
                :rules="[requiredValidator, englishValidator(addressEn), lengthValidator(addressEn, 255)]" />
            </VCol>
            
            <VCol cols="12" md="6">
              <VLabel>
                {{ $t('form-data.address-ar') }}
              </VLabel>
    
              <VTextField v-model="addressAr" variant="outlined"
                :rules="[requiredValidator, arabicValidator(addressAr), lengthValidator(addressAr, 255)]" />
            </VCol>
    
            <VCol cols="12">
              <VBtn type="submit">
                {{ $t('form-data.submit') }}
              </VBtn>
            </VCol>
          </VRow>
        </VCol>
      </VRow>
    </VForm>
  </div>
</template>

<script setup>
import { useValidators } from '~/@core/utils/validators'
import { useContactStore } from '@/stores/contact'

const { lengthValidator, requiredValidator, emailValidator } = useValidators()

const { locale } = useI18n()

const store = useContactStore()
const refVForm = ref()

const nameEn = ref('')
const nameAr = ref('')
const email = ref('')
const subject = ref('')
const addressEn = ref('')
const addressAr = ref('')

// Improved validators
const englishValidator = (value) => {
  if (!value) return true
  
  // Allow English letters, numbers, spaces, and common punctuation
  const englishRegex = /^[A-Za-z0-9\s\-\'\,\.]+$/
  
  return (
    englishRegex.test(value) || 
    (locale.value === 'ar' ? 
      'يُسمح فقط بالأحرف الإنجليزية والأرقام والمسافات' : 
      'Only English letters, numbers, and spaces are allowed')
  )
}

const arabicValidator = (value) => {
  if (!value) return true
  
  // Allow Arabic letters, numbers, spaces, and common Arabic punctuation
  const arabicRegex = /^[\u0600-\u06FF0-9\s\-\'\,\.]+$/
  
  return (
    arabicRegex.test(value) || 
    (locale.value === 'ar' ? 
      'يُسمح فقط بالأحرف العربية والأرقام والمسافات' : 
      'Only Arabic letters, numbers, and spaces are allowed')
  )
}

const submitForm = () => {
  refVForm.value?.validate().then(async ({ valid: isValid }) => {
    if(isValid) {
      store.savedData = {
        'fullname-en': nameEn.value,
        'fullname-ar': nameAr.value,
        'email': email.value,
        'subject': subject.value,
        'address-en': addressEn.value,
        'address-ar': addressAr.value
      }

      navigateTo(`/${locale.value}/`)
    }
  })
}

const autoFill = () => {
  nameEn.value = 'Hiba Allah Shakoof'
  nameAr.value = 'هبة الله شقوف'

  email.value = 'hibashakoof@gmail.com'
  subject.value = 'Web Developer, AI Engineer'

  addressEn.value = 'Syria, Damascus'
  addressAr.value = 'سوريا, دمشق'
}

onMounted(() => {
  // autoFill()
})
</script>

<style lang="scss" scoped>
.form-wrapper {
  width: 90%;
  margin: auto;

  .form-content {
    padding: 1rem 2rem;
    border-radius: .75rem;
    background-color: rgba(#ee82ee, .25);
  }
}

.v-label {
  font-size: 1rem;
  color: rgb(var(--v-theme-main-title)) !important;
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: block;
}

:deep(input) {
  font-size: 1rem;
}

:deep(.v-field__input) {
  min-height: 2.5rem;
  padding: .75rem;
  border-radius: 8px;
}

.v-btn {
  box-shadow: none;
  background: linear-gradient(to right, purple, violet, purple);
  color: rgb(var(--v-theme-main-title));
  padding: 0.75rem 2rem;
  font-weight: 600;
  margin-top: 1rem;
  height: fit-content;
  border-radius: .75rem;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
}

:deep(.v-input__details) {
  padding-inline: 0 !important;
}

.image-wrapper {
  animation: bounce 5s ease infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  .v-img {
    max-height: 25rem;
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(-3rem);
  }
  50% {
    transform: translateY(5rem);
  }
}

// Responsive adjustments
@media (max-width: 960px) {
  .form-wrapper {
    width: 95%;
    padding: 0.75rem;
  }

  .v-label,
  :deep(input) {
    font-size: .875rem;
  }

  :deep(.v-field__input) {
    height: 1rem !important;
  }
  
  .v-btn {
    width: 100%;
  }
}
</style>