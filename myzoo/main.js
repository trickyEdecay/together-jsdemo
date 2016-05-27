//所有的操作都要基于在space上面
function space(){
    
    //房间数组
    this.rooms = new Array();
    
    //金币
    this.money = 100;
    
    //繁华度
    this.flourfishing = 0;
    
    //模拟时间流逝
    setInterval("routineCal(this)",500);
    
    //空间会定时运行这个方法来模拟时间的流逝
    function routineCal(sp){
        if(sp.rooms.length<=0){
            return;
        }
            alert("asa");
        for(rm in sp.rooms){
            for(pet in rm.pets){
                pet.hungry --;
                sp.money+=10;
                console.log(pet.name+":"+pet.hungry+":"+sp.money);
            }
        }
    }
    
    //添加房间
    this.addRoom = function(room){
        for(r in this.rooms){
            if(r.name == room.name){
                console.error("这个空间里已经存在这个名字的房间了!添加房间失败!");
                return;
            }
        }
        this.rooms.push(room);
        room.space = this;
        this.minusMoney(room.cost());
    }
    
    //获取房间总数量
    this.roomCount = function(){
        return this.rooms.length;
    }
    
    //取得金币数量
    this.getMoney = function(){
        return this.money;
    }
    
    //设置金币数量
    this.setMoney = function(m){
        m = m>=0?m:0;
        this.money = m;
    }
    
    //添加金币
    this.addMoney = function(m){
        this.money=this.money+m;
    }
    
    //减少金币
    this.minusMoney = function(m){
        if(this.money-m<0){
            console.error("金币不足!!");
        }
        this.money=this.money-m;
    }
    
    return this;
}

//房间类型
var roomtype = {
    small : "small",
    medium : "medium",
    large : "large"
};


//房间类(房间类型,房间名字)
function room(type,rm){
    
    //默认允许养的宠物数量
    this.limitcount = 10; 
    
    //已经存在的宠物列表
    this.pets = new Array();
    
    
    //房间名称
    this.roomname = rm;
    
    //房间类型
    this.roomtype = type;
    
    //房间所属空间
    this.space = undefined;
    
    //参数判定
    if(type!=roomtype.small && type!=roomtype.medium && type!=roomtype.large){
        console.error("你新建的房间类型不对!最好从roomtype里面直接选择!");
    }
    
    //计算花费
    this.cost = function(){
        switch(type){
            case roomtype.small:
                return 50;
            case roomtype.medium:
                return 60;
            case roomtype.large:
                return 90;
        }
    }
    
    switch(type){
        case roomtype.small:
            limitcount = 10;
            break;
        case roomtype.medium:
            limitcount = 20;
            break;
        case roomtype.large:
            limitcount = 40;
            break;
    }
    
    
    //添加宠物
    this.addPet = function(pet){
        for(p in this.pets){
            if(p.name == pet.name){
                console.error("这个房间里已经存在这个名字的宠物了!添加宠物失败!");
                return;
            }
        }
        this.pets.push(pet);
        pet.room = this;
        this.space.minusMoney(pet.cost());
        this.space.flourfishing++;
    }
    
    //获得宠物的数量
    this.getPetsCount = function(){
        return this.pets.length;
    }
    
    
    return this;
}


//猫类
function cat(n){
    //年龄
    this.age = 0;
    
    //性别
    this.sex = 0;
    
    //饱食度
    this.hungry = 100;
    
    //名称
    this.name = n;
    
    //所属的房间
    this.room = undefined;
    
    //计算花费
    this.cost = function(){
        return 20;
    }
    
    //喂食
    this.feed = function(fd){
        this.room.space.minusMoney(fd.cost);
        this.hungry+=fd.give;
    }
    
    
    return this;
}

//食物
var food = {
    hamburger:{
        name: "hamburger",
        cost: 5,
        give: 3
    }
};