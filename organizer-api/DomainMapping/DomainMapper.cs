namespace organizer_api.DomainMapping
{
    public abstract class DomainMapper<D,E>
    {
        public abstract D ToDomain(E entity);
        public abstract E ToEntity(D domain);
        public IEnumerable<D> ToDomain(IEnumerable<E> entities)
        {
            return entities.Select(e => ToDomain(e));
        }
        public IEnumerable<E> ToEntity(IEnumerable<D> domainElements)
        {
            return domainElements.Select(d => ToEntity(d));
        }
    }
}
