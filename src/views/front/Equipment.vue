<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="器材编号" prop="equipCode">
        <el-input
            v-model="queryParams.equipCode"
            placeholder="请输入器材编号"
            clearable
            @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="器材名称" prop="equipName">
        <el-input
            v-model="queryParams.equipName"
            placeholder="请输入器材名称"
            clearable
            @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!--      <el-form-item label="单价" prop="price">-->
      <!--        <el-input-->
      <!--            v-model="queryParams.price"-->
      <!--            placeholder="请输入单价"-->
      <!--            clearable-->
      <!--            @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="器材图片" prop="equipPicture">-->
      <!--        <el-input-->
      <!--            v-model="queryParams.equipPicture"-->
      <!--            placeholder="请输入器材图片"-->
      <!--            clearable-->
      <!--            @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="长度" prop="longth">-->
      <!--        <el-input-->
      <!--            v-model="queryParams.longth"-->
      <!--            placeholder="请输入长度"-->
      <!--            clearable-->
      <!--            @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="宽度" prop="width">-->
      <!--        <el-input-->
      <!--            v-model="queryParams.width"-->
      <!--            placeholder="请输入宽度"-->
      <!--            clearable-->
      <!--            @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="高度" prop="high">-->
      <!--        <el-input-->
      <!--            v-model="queryParams.high"-->
      <!--            placeholder="请输入高度"-->
      <!--            clearable-->
      <!--            @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="重量" prop="weight">-->
      <!--        <el-input-->
      <!--            v-model="queryParams.weight"-->
      <!--            placeholder="请输入重量"-->
      <!--            clearable-->
      <!--            @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="数量" prop="number">-->
      <!--        <el-input-->
      <!--            v-model="queryParams.number"-->
      <!--            placeholder="请输入数量"-->
      <!--            clearable-->
      <!--            @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="生产厂家" prop="producer">-->
      <!--        <el-input-->
      <!--            v-model="queryParams.producer"-->
      <!--            placeholder="请输入生产厂家"-->
      <!--            clearable-->
      <!--            @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="购买日期" prop="purchasingDate">-->
      <!--        <el-date-picker clearable-->
      <!--                        v-model="queryParams.purchasingDate"-->
      <!--                        type="date"-->
      <!--                        value-format="yyyy-MM-dd"-->
      <!--                        placeholder="请选择购买日期">-->
      <!--        </el-date-picker>-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="备注" prop="remarks">-->
      <!--        <el-input-->
      <!--            v-model="queryParams.remarks"-->
      <!--            placeholder="请输入备注"-->
      <!--            clearable-->
      <!--            @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <!--    <el-button  @click="handleAdd()">默认按钮</el-button>-->
    <div style="display: flex">
      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button
              type="primary"
              plain
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd"
          >新增
          </el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
              type="success"
              plain
              icon="el-icon-edit"
              size="mini"
              :disabled="single"
              @click="handleUpdate"
          >修改
          </el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
              type="danger"
              plain
              icon="el-icon-delete"
              size="mini"
              :disabled="multiple"
              @click="handleDelete"
          >删除
          </el-button>
        </el-col>
        <!--      <el-col :span="1.5">-->
        <!--        <el-button-->
        <!--            type="warning"-->
        <!--            plain-->
        <!--            icon="el-icon-download"-->
        <!--            size="mini"-->
        <!--            @click="handleExport"-->
        <!--        >导出</el-button>-->
        <!--      </el-col>-->

      </el-row>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </div>


    <el-table v-loading="loading" :data="equipmentList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="序号" align="center" prop="id"/>
      <el-table-column label="器材编号" align="center" prop="equipCode"/>
      <el-table-column label="器材名称" align="center" prop="equipName"/>
      <el-table-column label="器材类型" align="center" prop="equipType" :formatter="statusFormat"/>
      <el-table-column label="单价" align="center" prop="price"/>
      <el-table-column label="器材图片" align="center" prop="equipPicture" width="100">
        <template slot-scope="scope">
          <image-preview :src="scope.row.equipPicture" :width="50" :height="50"/>
        </template>
      </el-table-column>
      <!--      <el-table-column label="器材图片">-->
      <!--        <template v-slot="scope">-->
      <!--          <div style="display: flex; align-items: center">-->
      <!--            <el-image style="width: 40px; height: 40px; border-radius: 50%" v-if="scope.row.equipPicture"-->
      <!--                      :src="scope.row.equipPicture" :preview-src-list="[scope.row.equipPicture]"></el-image>-->
      <!--          </div>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <el-table-column label="长度" align="center" prop="longth"/>
      <el-table-column label="宽度" align="center" prop="width"/>
      <el-table-column label="高度" align="center" prop="high"/>
      <el-table-column label="重量" align="center" prop="weight"/>
      <el-table-column label="数量" align="center" prop="number"/>
      <!--      <el-table-column label=" 状态(借出/未借出)" align="center" prop="status" :formatter="rentFormat"/>-->
      <el-table-column label="生产厂家" align="center" prop="producer"/>
      <el-table-column label="购买日期" align="center" prop="purchasingDate" width="180">
        <!--        <template slot-scope="scope">-->
        <!--          <span>{{ this.parseTime(scope.row.purchasingDate, '{y}-{m}-{d}') }}</span>-->
        <!--        </template>-->
      </el-table-column>
      <el-table-column label="备注" align="center" prop="remarks"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handleUpdate(scope.row)"
          >修改
          </el-button>
          <el-button
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
        v-show="total>0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="getList"
    />

    <!-- 添加或修改equipment对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="器材编号" prop="equipCode">
          <el-input v-model="form.equipCode" placeholder="请输入器材编号"/>
        </el-form-item>
        <el-form-item label="器材名称" prop="equipName">
          <el-input v-model="form.equipName" placeholder="请输入器材名称"/>
        </el-form-item>
        <el-form-item label="器材类型" prop="equipType">
          <el-select v-model="form.reservationType" clearable placeholder="器材类型">
            <el-option
                v-for="item in equipTypeDict"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单价" prop="price">
          <el-input v-model="form.price" placeholder="请输入单价"/>
        </el-form-item>
        <el-form-item label="器材图片" prop="equipPicture">
          <!--          <image-upload v-model="form.equipPicture"/>-->
          <el-upload
              class="avatar-uploader"
              :action="$baseUrl + '/files/upload'"
              :headers="{ token: token }"
              list-type="picture"
              :on-success="handleAvatarSuccess">
            <el-button type="primary">上传图片</el-button>
          </el-upload>
        </el-form-item>

        <el-form-item label="长度" prop="longth">
          <el-input v-model="form.longth" placeholder="请输入长度"/>
        </el-form-item>
        <el-form-item label="宽度" prop="width">
          <el-input v-model="form.width" placeholder="请输入宽度"/>
        </el-form-item>
        <el-form-item label="高度" prop="high">
          <el-input v-model="form.high" placeholder="请输入高度"/>
        </el-form-item>
        <el-form-item label="重量" prop="weight">
          <el-input v-model="form.weight" placeholder="请输入重量"/>
        </el-form-item>
        <el-form-item label="数量" prop="number">
          <el-input v-model="form.number" placeholder="请输入数量"/>
        </el-form-item>
        <el-form-item label="生产厂家" prop="producer">
          <el-input v-model="form.producer" placeholder="请输入生产厂家"/>
        </el-form-item>
        <el-form-item label="购买日期" prop="purchasingDate">
          <el-date-picker clearable
                          v-model="form.purchasingDate"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="请选择购买日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input v-model="form.remarks" placeholder="请输入备注"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {listEquipment, getEquipment, delEquipment, addEquipment, updateEquipment} from "@/api/equipment/equipment";
import getDictData from "@/utils/dict";


export default {
  name: "Equipment",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // equipment表格数据
      equipmentList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        equipCode: null,
        equipName: null,
        equipType: null,
        price: null,
        equipPicture: null,
        longth: null,
        width: null,
        high: null,
        weight: null,
        number: null,
        status: null,
        producer: null,
        purchasingDate: null,
        remarks: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        equipCode: [
          {required: true, message: "器材编号不能为空", trigger: "blur"}
        ],
        equipName: [
          {required: true, message: "器材名称不能为空", trigger: "blur"}
        ],
      },
      token: JSON.parse(localStorage.getItem('xm-user') || '{}').token,
      equipTypeDict: getDictData("equipType"),
      rentStatusDict: getDictData("rentStatus"),
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询equipment列表 */
    getList() {
      this.loading = true;
      listEquipment(this.queryParams).then(response => {
        this.equipmentList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        equipCode: null,
        equipName: null,
        equipType: null,
        price: null,
        equipPicture: null,
        longth: null,
        width: null,
        high: null,
        weight: null,
        number: null,
        status: null,
        producer: null,
        purchasingDate: null,
        remarks: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.title = "添加器材信息";
      this.reset();
      this.open = true;

    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.form = {};
      const id = row.id || this.ids
      getEquipment(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改器材信息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateEquipment(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addEquipment(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除器材信息表编号为"' + ids + '"的数据项？').then(function () {
        return delEquipment(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {
      });
    },
    handleAvatarSuccess(response, file, fileList) {
      // 把头像属性换成上传的图片的链接
      this.form.equipPicture = response.data
    },
    statusFormat(row, column) {
      return this.equipTypeDict.map((item) => {
        if (row.equipType === item.value) {
          return item.label;
        }
      });
    },
    rentFormat(row, column) {
      return this.rentStatusDict.map((item) => {
        if (row.status === item.value) {
          return item.label;
        }
      });
    },
  }
};

</script>
