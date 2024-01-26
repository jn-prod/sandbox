<script lang="tsx">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import type { IBulletItem } from './bullet.conf';

export default defineComponent({
  props: {
    bullet: {
        type: Object as PropType<IBulletItem>,
        required: true
    }
  },
  render() {
    return (
      <article class="bullet">
        <input type='checkbox' id={this.bullet.id}></input>
        <label class="bullet__label" for={this.bullet.id}>{this.bullet.note}</label>
      </article>
    );
  },
});
</script>

<style lang="scss" scoped>
.bullet {
  &__label {
      margin-left: 0.4rem;
  }
}
</style>