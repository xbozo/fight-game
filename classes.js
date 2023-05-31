class Character {

    _life = 1
    maxLife = 1
    attack = 0
    defense = 0

    constructor(name) {
        this.name = name
    }

    get life() {
        return this._life
    }
    
    set life(newLife) {
        this._life = newLife < 0 ? 0 : newLife    // Faz um check se a vida atualizada é menor do que 0. Se for, seta 0, se não seta o valor determinado
    }
}

class Knight extends Character {
    constructor(name) {
        super(name)          // acessa o construtor da raiz em que se está extendendo (name da class character)
        this.life = 100
        this.attack = 10
        this.defense = 8
        this.maxLife = this.life
    }
}

class Sorcerer extends Character {
    constructor(name) {
        super(name)
        this.life = 80
        this.attack = 15
        this.defense = 3
        this.maxLife = this.life
    }
}

class LittleMonster extends Character {
    constructor() {
        super("Little Monster")
        this.life = 40
        this.attack = 4
        this.defense = 4
        this.maxLife = this.life
        
    }
}

class BigMonster extends Character {
    constructor() {
        super("Big Monster")
        this.life = 120
        this.attack = 16
        this.defense = 6
        this.maxLife = this.life
        
    }
}

class Stage {
    constructor(fighter1, fighter2, fighter1Elements, fighter2Elements, logObject) {
        this.fighter1  = fighter1 
        this.fighter2  = fighter2 
        this.fighter1Elements = fighter1Elements
        this.fighter2Elements = fighter2Elements
        this.log = logObject
    }

    start() {
        this.update()

        this.fighter1Elements.querySelector(".attackButton").addEventListener("click", () => this.doAttack(this.fighter1, this.fighter2))
        this.fighter2Elements.querySelector(".attackButton").addEventListener("click", () => this.doAttack(this.fighter2, this.fighter1))
    }

    update() {           // atualiza os status dos personagens
        //Fighter 1
        this.fighter1Elements.querySelector(".name").innerHTML = `${this.fighter1.name} - ${this.fighter1.life.toFixed(2)} HP`
        let fighter1Perc = (this.fighter1.life / this.fighter1.maxLife) * 100                            // cálculo da barra de vida
        this.fighter1Elements.querySelector(".bar").style.width = `${fighter1Perc}%`


        //Fighter 2
        this.fighter2Elements.querySelector(".name").innerHTML = `${this.fighter2.name} - ${this.fighter2.life.toFixed(2)} HP`
        let fighter2Perc = (this.fighter2.life / this.fighter2.maxLife) * 100    
        this.fighter2Elements.querySelector(".bar").style.width = `${fighter2Perc}%`
    }

    doAttack(attacking, attacked) {
        if(attacking.life <= 0 || attacked.life <= 0) {
            this.log.addMessage(`Já foi de vasco =/`)
            return
        }

        let attackFactor = (Math.random() * 2).toFixed(2)    // dano de ataque baseado em um número multiplicador random, valor base tomado dos status do personagem
        let defenseFactor = (Math.random() * 2).toFixed(2)

        let actualAttack = attacking.attack * attackFactor
        let actualDefense = attacked.defense * defenseFactor

        if(actualAttack > actualDefense) {        // se o dano randomizado de ataque for maior que o de defesa, o ataque será executado
            attacked.life -= actualAttack
            this.log.addMessage(`${attacking.name} causou ${actualAttack.toFixed(2)} de dano em ${attacked.name}!`)
        } else {
            this.log.addMessage(`${attacked.name} conseguiu defender...`)
        }

        this.update()
    }
}

class Log {
    list = []

    constructor (listElements) {
        this.listElements = listElements
    }

    addMessage(msg) {
        this.list.push(msg)      // adiciona a mensagem na lista
        this.render()          // renderiza a lista novamente
    }

    render() {
        this.listElements.innerHTML = ""

        for (let i in this.list) {
            this.listElements.innerHTML += `<li>${this.list[i]}</li>`
        }
    }
}
