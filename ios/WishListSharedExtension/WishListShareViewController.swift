//
//  ShareViewController.swift
//  WishListSharedExtension
//
//  Created by Bailey Spell on 11/11/20.
//
import UIKit

class WishListShareViewController: UIViewController {
  override func viewDidLoad() {
    super.viewDidLoad()
    
    // set back and call function to create nav bar
    self.view.backgroundColor = .systemGray6
    setupNavBar()
  }
  
  private func setupNavBar() {
    self.navigationItem.title = "Add Item to Wish List"
    
    let itemCancel = UIBarButtonItem(barButtonSystemItem: .cancel, target: self, action: #selector(cancelAction))
    self.navigationItem.setLeftBarButton(itemCancel, animated: false)
    
    let itemDone = UIBarButtonItem(barButtonSystemItem: .done, target: self, action: #selector(doneAction))
    self.navigationItem.setRightBarButton(itemDone, animated: false)
  }
  
  @objc private func cancelAction() {
    // might have to change the domain
    let error = NSError(domain: "some.bundle.identifier", code: 0, userInfo:  [NSLocalizedDescriptionKey: "An error description"])
    extensionContext?.cancelRequest(withError: error)
  }

  @objc private func doneAction() {
    extensionContext?.completeRequest(returningItems: [], completionHandler: nil)
  }

  // 1: Set the `objc` annotation
  @objc(CustomShareNavigationController)
  class CustomShareNavigationController: UINavigationController {

      override init(nibName nibNameOrNil: String?, bundle nibBundleOrNil: Bundle?) {
          super.init(nibName: nibNameOrNil, bundle: nibBundleOrNil)

          // 2: set the ViewControllers
          self.setViewControllers([WishListShareViewController()], animated: false)
      }

      @available(*, unavailable)
      required init?(coder aDecoder: NSCoder) {
          super.init(coder: aDecoder)
      }
  }
}
