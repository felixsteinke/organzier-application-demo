namespace organizer_api.DomainMapping
{
    public abstract class DomainMapper<D,E>
    {
        public abstract D ToDomain(E entity);
        public abstract E ToEntity(D domain);
        public IEnumerable<D> ToDomain(IEnumerable<E> entities) => entities.Select(ToDomain);
        public IEnumerable<E> ToEntity(IEnumerable<D> domainElements) => domainElements.Select(ToEntity);
    }
}
