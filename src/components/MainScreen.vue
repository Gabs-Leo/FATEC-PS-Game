<script setup lang="ts">
  import { ref } from 'vue'
  import { Entity, getDamageVariation, getRandomInt } from "../assets/Entity"

  const hero = ref<Entity>(new Entity(10));
  const enemy = ref<Entity>(new Entity(10)); 
  
  const recieveAttack = (action: TurnAction) => {
    const dmg = (enemy.value.baseDamage+getDamageVariation()) / (action == TurnAction.DEFEND ? 2 : 1);
    enemy.value.attack(hero, dmg);
    console.log("inimigo causou "+dmg+" de dano.");
    if(enemy.value.health == 0) {
      alert("Vida do inimigo zerada, você venceu!");
      hero.value = new Entity(10);
      enemy.value = new Entity(10);
    }
  }

  const attackEnemy = (enemyInput:number) => {
    const dmg = (hero.value.baseDamage+getDamageVariation()) / (enemyInput == 1 ? 2 : 1);
    hero.value.attack(enemy, dmg);
    console.log("você causou "+dmg+" de dano.");
    if(enemy.value.health == 0) {
      alert("Vida do inimigo zerada, você venceu!");
      hero.value = new Entity(10);
      enemy.value = new Entity(10);
    }
  }

  enum TurnAction {
    ATTACK, DEFEND, POTION, RUN
  }

  const startTurn = (action : TurnAction) => {
    const enemyInput = getRandomInt(4);
    switch(action){
      case TurnAction.ATTACK:
        attackEnemy(enemyInput)
        break;
      case TurnAction.DEFEND:
        console.log("você defendeu, o dano recebido será reduzido pela metade.");
        break;
      case TurnAction.POTION:
        hero.value.pocao(hero);
        console.log("você usou poção.");
        break;
      case TurnAction.RUN:
        if(hero.value.correr()){
          window.alert("Você fugiu, luta encerrada.")
          hero.value = new Entity(10);
          enemy.value = new Entity(10);
        } else {
          console.log("você tentou fugir, mas falhou.")
        }
        break;
    }

    switch(enemyInput){
      case 0:
        const dmg = (enemy.value.baseDamage+getDamageVariation()) / (action == TurnAction.DEFEND ? 2 : 1);
        enemy.value.attack(hero, dmg);
        console.log("inimigo causou "+dmg+" de dano.");
        if(enemy.value.health == 0) {
          alert("Sua vida foi zerada, você perdeu!");
          hero.value = new Entity(10);
          enemy.value = new Entity(10);
        }
        break;
      case 2:
        if(enemy.value.potions == 0){
          console.log("inimigo usou poção, mas falhou.");
          recieveAttack(action);
          return;
        }
        enemy.value.pocao(enemy);
        console.log("inimigo usou poção.");
        break;
      case 3:
        if(enemy.value.correr()){
          window.alert("O inimigo fugiu, luta encerrada.");
          hero.value = new Entity(10);
          enemy.value = new Entity(10);
        } else {
          console.log("o inimigo tentou fugir, mas falhou.")
          recieveAttack(action);
        }
        break;
    }
  }
  
</script>

<template>
  <div class="personagem">
    <div class="barra-vida" :style="{width: hero.health + '%'}">{{ hero.health }}%</div>
    <div class="sprite">Figura do personagem</div>
    <h1>Herói</h1>
    <div class="acoes">
      <button @click="startTurn(TurnAction.ATTACK)">Atacar</button>
      <button @click="startTurn(TurnAction.DEFEND)">Defender</button>
      <button @click="startTurn(TurnAction.POTION)">Usar Poção</button>
      <button @click="startTurn(TurnAction.RUN)">Correr</button>
    </div>
  </div>

  <div class="personagem" >
    <div class="barra-vida" :style="{width: enemy.health + '%'}">{{ enemy.health }}%</div>
    <div class="sprite">Figura do personagem</div>
    <h1>Vilão</h1>
  </div>
</template>