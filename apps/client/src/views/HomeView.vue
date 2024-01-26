<script lang="tsx">
import { defineComponent } from 'vue';
import BulletItem from '@/bullets/BulletItem.vue';
import { getAll, addOne } from '@/bullets/bullet.service';
import type { IBulletItem } from '@/bullets/types';
// import SheetsService from '@/services/sheets.service';

interface HomeViewData {
  newBullet: string,
  allBullets: undefined | null | IBulletItem[]
}

export default defineComponent({
  components: {BulletItem},
  data(): HomeViewData {
    return {
      newBullet: "",
      allBullets: []
    }
  },
  async mounted() {
    this.allBullets = (await getAll()).data
  },
  methods: {
    async handleAddBulletInput(event) {
      if(event.key !== 'Enter') return;
      const {data, error } = await addOne({note: this.newBullet, key: 'todo'})
      if (data) {
        this.allBullets?.push(data)
        this.newBullet = ""
      } else if (error) {
        console.log(error)
      }
    }
  },
  render() {
    return (
      <main>
        {this.allBullets?.map(bullet => <bullet-item bullet={bullet}></bullet-item>)}
        <input type='text' onKeypress={this.handleAddBulletInput} v-model={this.newBullet}></input>
      </main>
    );
  },
});
</script>
