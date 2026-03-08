<template>
  <div class="bike-hero fade-up">
    <div class="bike-info">
      <div class="bike-tag">● Active Bike</div>
      <h1 class="bike-name">
        {{ bike.make }}<br />
        {{ bike.model }}<sub>{{ bike.variant }} — {{ bike.year }}</sub>
      </h1>
      <div class="bike-stats">
        <div class="stat-block">
          <label>Total KM</label>
          <value>{{ bike.odometer.toLocaleString() }}</value>
        </div>
        <div class="stat-block">
          <label>Last Service</label>
          <value>{{ bike.lastServiceKm.toLocaleString() }}</value>
        </div>
        <div class="stat-block">
          <label>Since Service</label>
          <value class="warn">{{ (bike.odometer - bike.lastServiceKm).toLocaleString() }} km</value>
        </div>
      </div>
    </div>

    <div>
      <img src="../../assets/images/kawa.png" alt="Kawasaki Z650" style="width: 100%; height: auto;" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Bike {
  make: string
  model: string
  variant: string
  year: number
  odometer: number
  lastServiceKm: number
  healthScore: number
}

withDefaults(defineProps<{ bike: Bike }>(), {
  bike: () => ({
    make: 'Ducati',
    model: 'Monster',
    variant: '821',
    year: 2021,
    odometer: 24381,
    lastServiceKm: 21200,
    healthScore: 87,
  })
})
</script>

<style scoped>
.bike-hero {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 24px;
  display: grid;
  grid-template-columns: 1fr 320px;
}

.bike-info {
  padding: 28px 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
}

.bike-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--accent);
  border: 1px solid var(--accent);
  padding: 3px 10px;
  border-radius: 3px;
  width: fit-content;
}

.bike-name {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 48px;
  font-weight: 900;
  letter-spacing: -0.01em;
  line-height: 1;
  text-transform: uppercase;
}

.bike-name sub {
  font-size: 22px;
  font-weight: 400;
  color: var(--muted);
  vertical-align: middle;
  margin-left: 8px;
  font-family: 'Barlow', sans-serif;
  text-transform: none;
}

.bike-stats {
  display: flex;
  gap: 28px;
}

.stat-block label {
  display: block;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 3px;
}

.stat-block value {
  font-family: 'Share Tech Mono', monospace;
  font-size: 20px;
  color: var(--text);
}

.stat-block value.ok  { color: var(--green); }
.stat-block value.warn { color: var(--yellow); }

.bike-visual {
  background: linear-gradient(135deg, #1a0800, #0d0d0d);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  min-height: 200px;
}

.bike-visual::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, rgba(232,93,4,0.15) 0%, transparent 70%);
}

.moto-svg {
  width: 260px;
  filter: drop-shadow(0 8px 32px rgba(232,93,4,0.3));
  transform: scaleX(-1);
  position: relative;
  z-index: 1;
}
</style>