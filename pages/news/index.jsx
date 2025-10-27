import news from "../../data/news.json";

export default function NewsIndex() {
  const list = Array.isArray(news) ? news : (news?.news ?? []);
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-2xl font-bold">Notícias</h1>
      <ul className="mt-6 space-y-3">
        {list.map(n => (
          <li key={n.slug}>
            <a className="text-sky-700 underline" href={`/news/${n.slug}`}>
              {n.title} — {n.date}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
