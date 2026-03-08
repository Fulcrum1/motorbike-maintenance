<template>
  <UModal v-model:open="open">
    <template #header>
      <h3 class="modal-title">Edit — {{ localData.name }}</h3>
    </template>

    <template #body>
      <div class="modal-body">

        <!-- Status -->
        <div class="field">
          <label>Status</label>
          <div class="status-options">
            <button
              v-for="s in statuses"
              :key="s.value"
              class="status-btn"
              :class="[s.value, { active: localData.status === s.value }]"
              @click="localData.status = s.value"
            >
              {{ s.label }}
            </button>
          </div>
        </div>

        <!-- Component name -->
        <div class="field">
          <label>Component Name</label>
          <input v-model="localData.name" class="input" placeholder="e.g. Engine Oil" />
        </div>

        <!-- Health % -->
        <div class="field">
          <label>Health — {{ localData.percent }}%</label>
          <input
            v-model.number="localData.percent"
            type="range"
            min="0" max="100"
            class="slider"
            :class="localData.status"
          />
          <div class="progress-preview">
            <div
              class="progress-fill"
              :class="localData.status"
              :style="{ width: `${localData.percent}%` }"
            />
          </div>
        </div>

        <!-- Date -->
        <div class="field">
          <label>Last Service Date</label>
          <input v-model="localData.date" type="date" class="input" />
        </div>

        <!-- Sub note -->
        <div class="field">
          <label>Note</label>
          <input v-model="localData.sub" class="input" placeholder="e.g. Changed 3,181 km ago" />
        </div>

      </div>
    </template>

    <template #footer>
      <div class="modal-footer">
        <button class="btn-cancel" @click="onCancel">Cancel</button>
        <button class="btn-save" @click="onSave">Save Changes</button>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
type Status = 'good' | 'warn' | 'crit'

export interface HealthData {
  name: string
  value: string
  sub: string
  date: string
  percent: number
  status: Status
}

const props = defineProps<{
  open: boolean
  data: HealthData
}>()

const emit = defineEmits<{
  (e: 'update:open', val: boolean): void
  (e: 'save', data: HealthData): void
}>()

// Local copy so we don't mutate props directly
const localData = ref<HealthData>({ ...props.data })

// Sync if parent changes the data (e.g. different card opened)
watch(() => props.data, (val) => {
  localData.value = { ...val }
})

// Keep v-model:open in sync
const open = computed({
  get: () => props.open,
  set: (val) => emit('update:open', val),
})

const statuses: { value: Status; label: string }[] = [
  { value: 'good', label: '✔ Good' },
  { value: 'warn', label: '⚠ Due Soon' },
  { value: 'crit', label: '✖ Replace' },
]

function onSave() {
  // Sync the display value string with the percent
  localData.value.value = `${localData.value.percent}%`
  emit('save', { ...localData.value })
  open.value = false
}

function onCancel() {
  localData.value = { ...props.data } // reset
  open.value = false
}
</script>

<style scoped>
.modal-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text);
  padding: 20px 24px 0;
}

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 4px 24px 20px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--muted);
}

.input {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 7px;
  padding: 10px 12px;
  color: var(--text);
  font-family: 'Barlow', sans-serif;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
  width: 100%;
}

.input:focus {
  border-color: var(--accent);
}

/* Range slider */
.slider {
  width: 100%;
  accent-color: var(--green);
  cursor: pointer;
}
.slider.warn { accent-color: var(--yellow); }
.slider.crit { accent-color: var(--red); }

/* Progress preview */
.progress-preview {
  height: 4px;
  background: var(--border);
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 2px;
  transition: width 0.3s ease;
  background: var(--green);
}
.progress-fill.warn { background: var(--yellow); }
.progress-fill.crit { background: var(--red); }

/* Status toggle */
.status-options {
  display: flex;
  gap: 8px;
}

.status-btn {
  flex: 1;
  padding: 8px;
  border-radius: 7px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  border: 1px solid var(--border);
  background: var(--panel);
  color: var(--muted);
  transition: all 0.15s;
}

.status-btn.good.active  { background: rgba(46,204,113,0.15);  color: var(--green);  border-color: var(--green); }
.status-btn.warn.active  { background: rgba(243,156,18,0.15);  color: var(--yellow); border-color: var(--yellow); }
.status-btn.crit.active  { background: rgba(231,76,60,0.15);   color: var(--red);    border-color: var(--red); }

/* Footer */
.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 20px 24px;
}

.btn-cancel {
  padding: 9px 18px;
  border-radius: 7px;
  border: 1px solid var(--border);
  background: none;
  color: var(--muted);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
}
.btn-cancel:hover { color: var(--text); border-color: #555; }

.btn-save {
  padding: 9px 20px;
  border-radius: 7px;
  border: none;
  background: var(--accent);
  color: white;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.15s;
}
.btn-save:hover { background: #ff7c2a; }
</style>