<template>
  <div>
    <component
      :is="`Ctsy${compontName}`"
      @CName="(v)=>{
              compontName = v
              }"
    ></component>
  </div>

</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component
export default class UserModeule extends Vue {
  compontName: string = "Login";
}
</script>
<style lang="css">
body {
  padding: 0;
  margin: 0;
}
</style>
<style lang="less" scoped >
@f2: #f2f2f2;
@gray_border: #ccc;
@border: 1px solid @f2;

.Ctsy_Background_Container {
  // transform: translate(0, 0);
  // position: absolute;
  width: 100%;
  height: 100%;
  z-index: -10;

  .User_Model_Container {
    background: url("../../assets/bg1.png");
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // min-width: 1000px;
    zoom: 1;
    background-color: #fff;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center 0;
    display: flex;
    align-items: center;
    justify-content: center;
    & > .Model_Container {
      background: #fff;
      border-radius: 4px;
      width: 385px;
      min-width: 390px;
      min-height: 400px;
      & > .Model_Header_Container {
        h3 {
          font-size: 18px;
          letter-spacing: 2px;
          text-indent: 2px;
          color: #000000;
          text-align: center;
          position: relative;
          i {
            cursor: pointer;
            position: absolute;
            left: 10px;
            top: 3px;
          }
        }
      }

      & > .Model_Body_Container {
        padding: 0 40px;
        transition: all 0.3 ease;
        /deep/.Ctsy_icon {
          width: 18px;
          height: 18px;
        }
        /deep/.Ctsy_Form_item {
          border-bottom: @border;
          input::-webkit-input-placeholder {
            font-size: 12px;
          }
          /deep/.Ctsy_Form_item_button {
            display: flex;
            flex-direction: row;
          }
          input {
            height: 100%;
            font-size: 16px;
            width: 100%;
            border: none;
            outline: none;
            padding: 0;
          }
        }

        /deep/button {
          width: 100%;
          border-radius: 2px;
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>