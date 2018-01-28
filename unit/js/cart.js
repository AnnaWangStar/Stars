var app = new Vue({
    // el: '#app',
    el: '.checkout',
    data: {
        message: 'Hello Vue!',
        productList: '',
        isAll: false,
        totalMoney: 0,
        isDelete: false,
        idDeleteTemp: '',
    },
    methods: {
        requestCart: function () {
            // 在一个Vue实例内使用$http
            this.$http.get('data/cartData.json').then(
                function (response) {
                    // alert(response);
                    this.productList = response.data.result.list;
                },
                function (response) {
                    alert("请求失败");
                }
            );
        },
        changeQuantity: function (productId) {
            for (var i = 0; i < this.productList.length; i++) {
                if (productId == this.productList[i].productId) {
                    this.productList[i].productQuantity--;
                }
                ;
            }
        },
        changeQuantity2: function (product, flag) {
            if (flag == 1) {
                product.productQuantity++;
            } else if (flag == 0) {
                if (product.productQuantity > 1) {
                    product.productQuantity--;
                }
            }
            else {
                alert("错误");
            }
            this.selectQuantity();
        },
        selectClick: function (product) {
            var isAllTemp = true;
            if (typeof product.select == 'undefined') {
                this.$set(product, 'select', true);
            } else {
                product.select = !product.select;
            }
            for (var i = 0; i < this.productList.length; i++) {
                if (this.productList[i].select != true) {
                    isAllTemp = false;
                }
            }
            this.isAll = isAllTemp;
            this.selectQuantity();
        },
        selectClickAll: function () {
            this.isAll = true;
            for (var i = 0; i < this.productList.length; i++) {
                var product = this.productList[i];
                if (typeof product.select == 'undefined') {
                    this.$set(product, 'select', true);
                } else {
                    product.select = true;
                }
            }
            this.selectQuantity();
        },
        cancelAll: function () {
            this.isAll = false;
            for (var i = 0; i < this.productList.length; i++) {
                var product = this.productList[i];
                if (typeof product.select == 'undefined') {
                    this.$set(product, 'select', false);
                } else {
                    product.select = false;
                }
            }
            this.selectQuantity();
        },
        //所选商品总金额
        selectQuantity: function () {
            this.totalMoney = 0;
            for (var i = 0; i < this.productList.length; i++) {
                var product = this.productList[i];
                if (product.select == true) {
                    this.totalMoney = this.totalMoney + product.productQuantity * product.productPrice;
                }
            }
        },
        // 弹出删除框，并记录当前删除行
        deleteProduct: function (product) {
            this.isDelete = true;
            this.idDeleteTemp = product.productId;
            this.selectQuantity();
        },
        // 点击yes,确认删除
        confirmDelete: function () {
            for (var i = 0; i < this.productList.length; i++) {
                if(this.idDeleteTemp == this.productList[i].productId ){
                    this.productList.splice(i,1);
                }
            }
            this.isDelete = false;
            this.selectQuantity();
        },
    },
    mounted: function () {
        this.$nextTick(function () {
            // 代码保证 this.$el 在 document 中
            this.requestCart();
        })
    },
    filters: {
        moneyFilter: function (value) {
            return '￥' + value.toFixed(2);
        },
        filterB: function (value) {
            return value + '1';
        }
    }
})