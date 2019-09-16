using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ElementUIApp.ViewModels
{
    public class QueryViewModel
    {
        public string DATA_XML { get; set; }

        public string PAGE_XML { get; set; }

        public List<DataItemModel> DataItemsModel { get; set; }

        public PageItemModel PageModel { get; set; }

    }
}