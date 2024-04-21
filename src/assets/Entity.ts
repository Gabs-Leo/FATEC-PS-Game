import { Ref } from "vue";

const maxLife = 100;
const potionValue = 50;
export const getRandomInt = (max:number) =>  Math.floor(Math.random() * max);
export const getDamageVariation = () => getRandomInt(5)+1;

export class Entity {
  health:number
  baseDamage:number
  potions:number

  constructor (baseDamage:number, health?:number, potions?:number) {
    this.health = health || maxLife;
    this.baseDamage = baseDamage;
    this.potions = potions || 2;
  }

  attack = (target:Ref<Entity>, damage?:number) => {
    const dmg = damage || this.baseDamage+getDamageVariation();
    if( target.value.health - dmg <= 0 )
      target.value.health = 0;
    else
      target.value.health = (target.value.health - (dmg));
  }

  defender = () => {

  }

  pocao = (target:Ref<Entity>) => {
    if(target.value.potions == 0){
      window.alert("As poções acabaram!")
      return;
    }

    if( target.value.health + potionValue >= maxLife )
      target.value.health = maxLife;
    else
      target.value.health = this.health + potionValue;

    target.value.potions = target.value.potions-1;
  }

  correr = () => {
    return getRandomInt(10) == 0;
  }
}