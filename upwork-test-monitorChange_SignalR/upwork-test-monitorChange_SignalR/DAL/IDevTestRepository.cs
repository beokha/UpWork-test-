using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace upwork_test_monitorChange_SignalR.DAL
{
    public interface IDevTestRepository : IDisposable
    {
        IEnumerable<DevTest> GetElements();
        DevTest GetElementsByID(int elementID);
        void InsertElement(DevTest Element);
        void DeleteElement(int elementID);
        void UpdateElement(DevTest Element);
        void Save();
    }
}