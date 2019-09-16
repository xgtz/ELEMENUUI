using ElementUIApp.ViewModels;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ElementUIApp.Controllers.Api
{
    public class SelectController : ApiController
    {
        [HttpPost]
        public ResultListViewModel<SelectItemViewModel> GetSelectData([FromBody]QueryViewModel model)
        {
            if (!string.IsNullOrEmpty(model.DATA_XML))
            {
                model.DataItemsModel = JsonConvert.DeserializeObject<List<DataItemModel>>(model.DATA_XML);
            }
            List<SelectItemViewModel> allSelectData = new List<SelectItemViewModel>() { 
                new SelectItemViewModel(){Label="黄金糕",Value="选项1"},
                new SelectItemViewModel(){Label="双皮奶",Value="选项2"},
                new SelectItemViewModel(){Label="水晶饼",Value="选项3"},
            };
            return new ResultListViewModel<SelectItemViewModel>(allSelectData, allSelectData.Count);
        }
    }
}
