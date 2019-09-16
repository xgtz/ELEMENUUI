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
    public class UserController : ApiController
    {
        [HttpPost]
        public ResultListViewModel<UserViewModel> GetUsers([FromBody]QueryViewModel model)
        {
            if (!string.IsNullOrEmpty(model.DATA_XML))
            {
                model.DataItemsModel = JsonConvert.DeserializeObject<List<DataItemModel>>(model.DATA_XML);
            }
            if (!string.IsNullOrEmpty(model.PAGE_XML))
            {
                model.PageModel = JsonConvert.DeserializeObject<PageItemModel>(model.PAGE_XML);
            }

            List<UserViewModel> allUserLst = new List<UserViewModel>() {
                new UserViewModel{ ID="1",NAME ="王小虎",DATE="2016-05-02",ADDRESS="上海市普陀区金沙江路 1518 弄",PROVINCE="北京",CITY="北京"},
                new UserViewModel{ ID="2",NAME ="曹晓骄",DATE="2016-05-04",ADDRESS="上海市普陀区金沙江路 1517 弄",PROVINCE="上海",CITY="上海"},
                new UserViewModel{ ID="3",NAME ="刘志成",DATE="2016-05-01",ADDRESS="上海市普陀区金沙江路 1519 弄",PROVINCE="杭州",CITY="杭州"},
                new UserViewModel{ ID="4",NAME ="六千里",DATE="2019-08-09",ADDRESS="上海市普陀区金沙江路 1519 弄",PROVINCE="西安",CITY="西安"}
            };

            List<UserViewModel> userLst = new List<UserViewModel>();
            if (null != model.PageModel)
            {
                userLst = allUserLst
                          .Skip((model.PageModel.CurrentPage - 1) * model.PageModel.PageSize)
                          .Take(model.PageModel.PageSize)
                          .ToList();
            }
            else {
                userLst = allUserLst;
            }

            return new ResultListViewModel<UserViewModel>(userLst, allUserLst.Count);
        }

    }
}
