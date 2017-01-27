using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace upwork_test_monitorChange_SignalR.DAL
{
    public class DevTestRepository : IDevTestRepository, IDisposable
    {
        private test_monitorChangesEntities context;

        public DevTestRepository(test_monitorChangesEntities context)
        {
            this.context = context;
        }

        private bool disposed = false;
        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    context.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }


        // Getting elements
        public IEnumerable<DevTest> GetElements()
        {
            return context.DevTest.ToList();
        }

        public DevTest GetElementsByID(int elementID)
        {
            return context.DevTest.Where(p => p.id == elementID).FirstOrDefault();
        }

        
        // Working with them
        public void Save()
        {
            context.SaveChanges();
        }

        public void InsertElement(DevTest Element)
        {
            context.DevTest.Add(Element);
        }

        public void UpdateElement(DevTest Element)
        {
            context.DevTest.Attach(Element);
            context.Entry(Element).State = System.Data.Entity.EntityState.Modified;
        }

        public void DeleteElement(int elementID)
        {
            DevTest elemet = context.DevTest.Find(elementID);
            context.DevTest.Remove(elemet);
        }
    }
}