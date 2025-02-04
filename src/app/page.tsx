const mockUrls = [
  "https://cde58ssrg5.ufs.sh/f/K11RarIgZR4ni3eCEJkpbcm8AJUxNBL47wjPnGlofytrCFV1",
  "https://cde58ssrg5.ufs.sh/f/K11RarIgZR4nZYwBZPp537QzKqnGY0dRXTgscDBrk8VlPmyE",
  "https://cde58ssrg5.ufs.sh/f/K11RarIgZR4nAlO8qs1mXKJeCySigoTB0tsZEI5fG634VdMz",
  "https://cde58ssrg5.ufs.sh/f/K11RarIgZR4n38jOVOPS61B9Zmi8ohdDr5lXKvxSTgPAMLGs"
]

const mockImages = mockUrls.map((url, index) => (
  {id: index + 1, 
    url
  }))
export default function HomePage() {
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
      {
        [...mockImages, ...mockImages, ...mockImages].map((image) => (
          <div key={image.id} className="w-48">
            <img src={image.url} alt="image" className="w-full" />
          </div>
        ))
      }
      </div>
    </main>
  );
}
